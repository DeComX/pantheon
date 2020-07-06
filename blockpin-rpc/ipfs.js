const grpc = require('grpc');
const path = require('path');
const CID = require('cids');

const rootdir = (address) => {
  return "/ethereum/" + address + "/";
};

const ipfsPath = (cid) => {
  return path.join('/ipfs/', cid.toString());
};

const ensureParentDir = (ipfs, mfsPath) => {
  // ensure the dir exists
  const dir = path.dirname(mfsPath);
  console.log('Creating dir ' + dir);
  return ipfs.files.mkdir(dir, {parents: true});
};

const fileStatByMfsPath = (ipfs, path, throwIfNotExists) => {
  return ipfs.files.stat(path)
    .then(stat => { return stat; })
    .catch(err => {
      if (err.message === 'file does not exist') {
        if (throwIfNotExists) {
          return Promise.reject({
            code: grpc.status.INVALID_ARGUMENT,
            message: 'path does not exist'
          });
        } else {
          return false;
        }
      } else {
        console.log("read file stat error", err);
        return Promise.reject('failed to get file stats');
      }
    });
};

const fieldStatByCid = (ipfs, cid) => {
  return ipfs.object.stat(cid, {timeout: '10s'})
    .then(stat => { return stat; })
    .catch(err => {
      console.log("read object stat error", err);
      return Promise.reject({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'cannot get information of cid ' + cid
      });
    });
}

const removePath = (ipfs, path) => {
  return ipfs.files.rm(path, {recursive: true})
    .then(() => { return Promise.resolve(); })
    .catch(err => {
      if (err.message === 'file does not exist') {
        return Promise.resolve();
      } else {
        console.log("read file stat error", err);
        return Promise.reject('failed to get file stats');
      }
    });
};

const removePin = async (ipfs, cid) => {
  try {
    await ipfs.pin.rm(cid);
  } catch(err) {
    console.log("pin rm error for " + cid.toString() + ": ", err);
  }
};

const processPin = async (ipfs, address, transaction, request) => {
  const root = rootdir(address);
  const mfsPath = path.join(root, request.path);

  const stat = await fileStatByMfsPath(ipfs, mfsPath);
  if (stat) {
    console.log('File already exists: ' + mfsPath);
    if (request.override) {
      console.log('Overriding ' + mfsPath);
      if (stat.cid.toString() !== request.cid) {
        await fieldStatByCid(ipfs, request.cid); // validate cid
        await removePath(ipfs, mfsPath);
        await ipfs.files.cp(ipfsPath(request.cid), mfsPath);
      }
    } else {
      return Promise.reject({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'path to pin already exists'
      });
    }
  } else {
    await fieldStatByCid(ipfs, request.cid); // validate cid
    await ipfs.files.mkdir(path.dirname(mfsPath), {parents: true});
    await ipfs.files.cp(ipfsPath(request.cid), mfsPath);
  }

  const rootStat = await fileStatByMfsPath(ipfs, root, true);
  if (rootStat.cumulativeSize == request.cumulativeSize) {
    // TODO: validate and sign transaction
    if (stat && stat.cid.toString() !== request.cid) {
      await removePin(ipfs, stat.cid);
      await ipfs.pin.add(new CID(request.cid));
    }
    console.log("Pinned " + request.cid + " at mfsPath");
    return { transaction: transaction };
  } else {
    // restore and throw
    console.log("Cumulative size not match, restoring...");
    try {
      await removePath(ipfs, mfsPath);
      if (stat) {
        await ipfs.files.cp(ipfsPath(stat.cid), mfsPath);
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.reject({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'cumulative size not match'
    });
  }
};

const listChildren = async (ipfs, mfsPath, cid) => {
  const children = [];
  for await (const file of ipfs.ls(ipfsPath(cid))) {
    children.push({
      cid: file.cid,
      name: file.name,
      size: file.size,
      type: file.type
    });
  }
  return children;
};

const processInfo = async (ipfs, address, request) => {
  const root = rootdir(address);
  const mfsPath = path.join(root, request.path);
  const stat = await fileStatByMfsPath(ipfs, mfsPath, true);
  let response = {
    cid: stat.cid,
    size: stat.size,
    cumulativeSize: stat.cumulativeSize,
    type: stat.type
  };
  if (stat.type === 'directory' && request.listChildren) {
    response.children = await listChildren(ipfs, mfsPath, stat.cid);
  }
  return response;
};

const processUnpin = async (ipfs, address, transaction, request) => {
  const root = rootdir(address);
  const mfsPath = path.join(root, request.path);
  // ensure file exists
  const stat = await fileStatByMfsPath(ipfs, mfsPath, true);
  await ipfs.files.rm(mfsPath, {recursive: true});
  await removePin(ipfs, stat.cid);
  // TODO: sign transaction
  return { transaction: transaction };
};

exports.init = async (ipfs, address) => {
  await ipfs.files.mkdir(rootdir(address), {parents: true});
};

exports.info = async (ipfs, request) => {
  return processInfo(ipfs, request.address, request.request);
};

exports.pin = async (ipfs, request) => {
  return processPin(ipfs, request.address, request.transaction, request.request);
};

exports.unpin = (ipfs, request) => {
  return processUnpin(ipfs, request.address, request.transaction, request.request);
};
