const ethers = require('ethers');
const rocksdb = require('./db');
const utils = require('./utils');

const verifyAddress = (hash, request) => {
  const address = ethers.utils.verifyMessage(hash, request.signature);
  if (request.address === address) {
    return Promise.resolve();
  } else {
    return Promise.reject({
      code: 'AUTH_FAILURE', message: 'invalid signature'
    });
  }
};

const verifyTimestamp = (db, request) => {
  return rocksdb.getTimestamp(db, request.address)
      .then((lastTimestamp) => {
        if (request.request.timestampMs > lastTimestamp) {
            return rocksdb.updateTimestamp(
              db, request.address, request.request.timestampMs
            )
        } else {
          return Promise.reject({
            code: 'AUTH_FAILURE', message: 'invalid timestamp'
          });
        }
      });
};

const verify = (db, hash, request) => {
  return verifyAddress(hash, request)
    .then(() => {
      return verifyTimestamp(db, request);
    });
};

const dummy_info_response = () => {
  return {
    mfsPath: '/dir/',
    byteSize: 1000,
    mtime: new Date().getTime()
  };
};

exports.info = (db, protoRoot, ipfs) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'INFO', call.request.request);
  verify(db, hash, call.request)
    .then(() => cb(null, dummy_info_response()))
    .catch(err => cb(err));
};

exports.pin = (db, protoRoot, ipfs) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'PIN', call.request.request);
  verify(db, hash, call.request)
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};

exports.unpin = (db, protoRoot, ipfs) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'UNPIN', call.request.request);
  verify(db, hash, call.request)
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};
