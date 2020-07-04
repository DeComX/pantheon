const ethers = require('ethers');
const rocksdb = require('./db');
const utils = require('./utils');
const ipfs = require('./ipfs');

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
            ).then(() => {
              // new user
              return Promise.resolve(lastTimestamp === 0);
            });
        } else {
          return Promise.reject({
            code: 'AUTH_FAILURE', message: 'invalid timestamp'
          });
        }
      });
};

const verify = (db, ipfsClient, hash, request) => {
  return verifyAddress(hash, request)
    .then(() => {
      return verifyTimestamp(db, request);
    })
    .then(isNewUser => {
      if (isNewUser) {
        return ipfs.init(ipfsClient, request.address);
      } else {
        return Promise.resolve();
      }
    })
};

exports.info = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'INFO', call.request.request);
  verify(db, ipfsClient, hash, call.request)
    .then(() => ipfs.info(ipfsClient, call.request.request))
    .then((response) => cb(null, response))
    .catch(err => cb(err));
};

exports.pin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'PIN', call.request.request);
  verify(db, ipfsClient, hash, call.request)
    .then(() =>
      ipfs.pin(ipfsClient, call.request))
    .then((response) => cb(null, response))
    .catch(err => cb(err));
};

exports.unpin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'UNPIN', call.request.request);
  verify(db, ipfsClient, hash, call.request)
    .then(() =>
      ipfs.pin(ipfsClient, call.request))
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};
