const grpc = require('grpc');
const ethers = require('ethers');
const rocksdb = require('./db');
const utils = require('./utils');
const ipfs = require('./ipfs');

const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const TIMEDELTA_MS = 10 * 60 * 1000; // 10 mins

const verifyAddress = (hash, request) => {
  const address = ethers.utils.verifyMessage(hash, request.signature);
  if (request.address === address) {
    return Promise.resolve();
  } else {
    return Promise.reject({
      code: grpc.status.UNAUTHENTICATED,
      message: 'invalid signature'
    });
  }
};

const now = () => {
  return new Date().getTime();
};

const verifyTimestamp = (db, request) => {
  const timestampMs = request.request.timestampMs;
  return rocksdb.getTimestamp(db, request.address)
      .then((lastTimestamp) => {
        // expire the request if
        //  1. it's older than last request
        //  2. it's issued within 10 mins
        if (timestampMs > lastTimestamp && now() - timestampMs < TIMEDELTA_MS) {
            return rocksdb.updateTimestamp(
              db, request.address, timestampMs
            ).then(() => {
              // new user
              return Promise.resolve(lastTimestamp === 0);
            });
        } else {
          console.log(now());
          console.log(timestampMs);
          console.log(lastTimestamp);
          return Promise.reject({
            code: grpc.status.UNAUTHENTICATED,
            message: 'invalid timestamp'
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
  verify(db, ipfsClient, hash, call.request)
    .then(() => ipfs.info(ipfsClient, call.request))
    .then((response) => cb(null, response))
    .catch(err => handleError(cb, err));
};

exports.pin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'PIN', call.request.request);
  const opt = {maxPending: 50, timeout: 10000};
  lock.acquire(call.request.address, () => {
    return verify(db, ipfsClient, hash, call.request)
      .then(() => ipfs.pin(ipfsClient, call.request))
  }, opt)
    .then(response => cb(null, response))
    .catch(err => handleError(cb, err));
};

exports.unpin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'UNPIN', call.request.request);
  const opt = {maxPending: 50, timeout: 10000};
  lock.acquire(call.request.address, () => {
    return verify(db, ipfsClient, hash, call.request)
      .then(() => ipfs.unpin(ipfsClient, call.request))
  }, opt)
    .then(response => cb(null, response))
    .catch(err => handleError(cb, err));
};
