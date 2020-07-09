const grpc = require('grpc');
const path = require('path');

const rootdir = (address) => {
  return "/ethereum/" + address;
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
          return Promise.reject('path does not exist');
        } else {
          return false;
        }
      } else {
        console.log("read file stat error", err);
        return Promise.reject('failed to get file stats');
      }
    });
};

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

const listChildren = async (ipfs, cid) => {
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
  const rootDir = rootdir(address);
  const mfsPath = path.join(rootDir, request.path);
  const stat = await fileStatByMfsPath(ipfs, mfsPath, true);
  let response = {
    cid: stat.cid,
    size: stat.size,
    cumulativeSize: stat.cumulativeSize,
    type: stat.type
  };
  if (stat.type === 'directory' && request.listChildren) {
    response.children = await listChildren(ipfs, stat.cid);
  }
  return response;
};

const updateRoot = async (ipfs, rootDir, oldRoot, transaction, request) => {
  const newRoot = await fileStatByMfsPath(ipfs, rootDir, true);
  if (newRoot.cumulativeSize == request.cumulativeSize) {
    // TODO: validate and sign transaction
    if (newRoot.cid !== oldRoot.cid) {
      await removePin(ipfs, oldRoot.cid);
      await ipfs.pin.add(newRoot.cid);
    }
  } else {
    console.log("Cumulative size not match, restoring...");
    await removePath(ipfs, rootDir),
    await ipfs.files.cp(ipfsPath(oldRoot.cid), rootDir);
    return Promise.reject({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'cumulative size not match'
    });
  }
};

const processPin = async (ipfs, address, transaction, request) => {
  const rootDir = rootdir(address);
  const mfsPath = path.normalize(path.join(rootDir, request.path));
  const oldRootStat = await fileStatByMfsPath(ipfs, rootDir, true);
  await ipfs.files.mkdir(path.dirname(mfsPath), {parents: true});
  await ipfs.files.cp(ipfsPath(request.cid), mfsPath);
  await updateRoot(ipfs, rootDir, oldRootStat, transaction, request);
};

const processUnpin = async (ipfs, address, transaction, request) => {
  const rootDir = rootdir(address);
  const mfsPath = path.normalize(path.join(rootDir, request.path));
  const oldRootStat = await fileStatByMfsPath(ipfs, rootDir, true);
  await removePath(ipfs, mfsPath);
  if (path.normalize(request.path) === '/') {
    await ipfs.files.mkdir(rootDir, {parents: true});
  }
  await updateRoot(ipfs, rootDir, oldRootStat, transaction, request);
};

exports.fileStatByMfsPath = (ipfs, address, userPath) => {
  const rootDir = rootdir(address);
  const mfsPath = path.normalize(path.join(rootDir, userPath));
  return fileStatByMfsPath(ipfs, mfsPath, false);
}

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
