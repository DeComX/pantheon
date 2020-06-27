const path = require('path');
const model = require('../proto/model_pb.js');

const readAll = async (ipfs, filename) => {
  const chunks = [];
  for await (const chunk of ipfs.files.read(filename)) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks);
}

export const listAll = async (ipfs, dir) => {
  const files = [];
  for await (const file of ipfs.files.ls(dir)) {
    files.push(file.name);
  }
  return files;
}

export const fileExists = async (ipfs, filename) => {
  const files = await listAll(ipfs, path.dirname(filename));
  return files.includes(path.basename(filename));
}

export const remove = async (ipfs, filename) => {
  const exists = await fileExists(ipfs, filename);
  if (exists) {
    await ipfs.files.rm(filename);
  }
}

export const uploadProto = async (ipfs, protoObj, filename) => {
  await upload(ipfs, protoObj.serializeBinary(), filename);
};

export const upload = async (ipfs, content, filename) => {
  await remove(ipfs, filename);
  for await (const uploaded of ipfs.add(content, {pin: true})) {
    const ipfsPath = '/ipfs/' + uploaded.cid.toString();
    await ipfs.files.cp(ipfsPath, filename);
  }
};

export const readUserInfo = async (ipfs, userFile) => {
  const bytes = await readAll(ipfs, userFile);
  return model.User.deserializeBinary(Uint8Array.from(bytes));
};

export const readTask = async (ipfs, taskFile) => {
  const bytes = await readAll(ipfs, taskFile);
  return model.Task.deserializeBinary(Uint8Array.from(bytes));
};

export const readContracts = async (ipfs, contractFile) => {
  const bytes = await readAll(ipfs, contractFile);
  return bytes.toString();
};
