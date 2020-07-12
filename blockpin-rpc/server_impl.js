const grpc = require('grpc');
const utils = require('./utils');
const ipfs = require('./ipfs');
const validator = require('./validator');

const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const handleError = (cb, err) => {
  console.log(err);
  if (err.code) {
    cb(err);
  } else {
    cb({
      code: grpc.status.GRPC_STATUS_INTERNAL,
      message: JSON.stringify(err)
    });
  };
};

exports.info = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'INFO', call.request.request);
  validator.validInfoRequest(db, ipfsClient, hash, call.request)
    .then(() => ipfs.info(ipfsClient, call.request))
    .then((response) => cb(null, response))
    .catch(err => handleError(cb, err));
};

exports.pin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'PIN', call.request.request);
  const opt = {maxPending: 50, timeout: 10000};
  lock.acquire(call.request.address, () => {
    return validator.validPinRequest(db, ipfsClient, hash, call.request)
      .then(() => ipfs.pin(ipfsClient, call.request))
  }, opt)
    .then(() => cb(null, {transaction: call.request.transaction}))
    .catch(err => handleError(cb, err));
};

exports.unpin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'UNPIN', call.request.request);
  const opt = {maxPending: 50, timeout: 10000};
  lock.acquire(call.request.address, () => {
    return validator.validUnpinRequest(db, ipfsClient, hash, call.request)
      .then(() => ipfs.unpin(ipfsClient, call.request))
  }, opt)
    .then(() => cb(null, {transaction: call.request.transaction}))
    .catch(err => handleError(cb, err));
};
