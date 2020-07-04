const path = require('path');

const homedir = (address) => {
  return "/ethereum/" + address + "/";
};

const addHome = (address, userPath) => {
  const prefix = homedir(address);
  if (userPath.startsWith('/')) {
    return path.join(prefix, userPath.substr(1));
  } else {
    return path.join(prefix, userPath);
  }
};

const ipfsPath = (cid) => {
  return path.join('/ipfs/', cid.toString());
};

const createParentsDir = (ipfs, mfsPath) => {
  // ensure the dir exists
  const dir = path.dirname(mfsPath);
  console.log('Creating dir ' + dir);
  return ipfs.files.mkdir(dir, {parents: true});
};

const fileStat = (ipfs, mfsPath) => {
  return ipfs.files.stat(mfsPath)
    .then(stat => {
      return stat;
    })
    .catch(err => {
      if (err.message == 'file does not exist') {
        return false;
      } else {
        return Promise.reject({
          code: 'IPFS_READ_ERROR',
          details: 'failed to get ipfs stat'
        });
      }
    });
};

const copy = async (ipfs, address, cid, path, override) => {
  const mfsPath = addHome(address, path);
  const stat = await fileStat(ipfs, mfsPath);
  if (stat) {
    console.log('File already exists: ' + mfsPath);
    if (stat.cid.toString() === cid.toString()) {
      console.log('Files are identical, no need to copy');
      return {cid: cid};
    }
    if (override) {
      console.log('Will override ' + mfsPath);
      console.log('Unpining file ' + stat.cid.toString());
      await ipfs.pin.rm(stat.cid, {recursive: true});
      console.log('Removing file ' + stat.cid.toString());
      await ipfs.files.rm(mfsPath, {recursive: true});
    } else {
      return Promise.reject({
        code: 'FILE_ALREADY_EXISTS',
        details: 'You can set override=true to override'
      });
    }
  } else {
    await createParentsDir(ipfs, mfsPath);
  }
  console.log('Copying ' + cid.toString() + ' to ' + mfsPath);
  return ipfs.files.cp(ipfsPath(cid), mfsPath).then(() => {
    return {cid: cid};
  });
};

//TODO: expire support
//TODO: support multiple files and folder upload/pin
const uploadAndPin = async (ipfs, address, request) => {
  for await (const result of ipfs.add(request.content, {pin: true})) {
    return copy(ipfs, address, result.cid, request.path, request.override);
  }
};

const copyAndPin = async (ipfs, address, request) => {
  await ipfs.pin.add(request.cid);
  return copy(ipfs, address, request.cid, request.path, request.override);
};

exports.init = async (ipfs, address) => {
  await ipfs.files.mkdir(homedir(address), {parents: true});
};

exports.info = async (ipfs, request) => {
  return {
    path: request.request.path,
    byteSize: 1000
  };
};

exports.pin = async (ipfs, request) => {
  const pinRequest = request.request;
  if (pinRequest.content) {
    return uploadAndPin(ipfs, request.address, pinRequest);
  } else if (pinRequest.cid) {
    return copyAndPin(ipfs, request.address, pinRequest);
  } else {
    return Promise.reject({
      code: 'INVALID_INFO_REQUEST', details: 'missing filesource'
    });
  }
};

exports.unpin = (ipfs, request) => {
  return {
    path: request.request.path
  };
};
