const grpc = require('grpc');
const ethers = require('ethers');
const rocksdb = require('./db');
const utils = require('./utils');
const ipfs = require('./ipfs');
const isValid = require('is-valid-path');

const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const TIMEDELTA_MS = 10 * 60 * 1000; // 10 mins

const validAddress = (hash, request) => {
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

const validTimestamp = (db, request) => {
  const timestampMs = request.request.timestampMs;
  return rocksdb.getTimestamp(db, request.address)
      .then((lastTimestamp) => {
        // expire the request if
        //  1. it's older than last request
        //  2. it's issued within 10 mins
        const now = new Date().getTime();
        if (timestampMs > lastTimestamp && now - timestampMs < TIMEDELTA_MS) {
            return rocksdb.updateTimestamp(
              db, request.address, timestampMs
            ).then(() => {
              if (lastTimestamp === 0) {
                return ipfs.init(ipfsClient, request.address);
              } else {
                return Promise.resolve();
              }
            });
        } else {
          return Promise.reject({
            code: grpc.status.UNAUTHENTICATED,
            message: 'invalid timestamp'
          });
        }
      });
};

const validCid = (ipfsClient, cid) => {
  if (cid && cid.startsWith("Qm") && cid.length === 46) {
    return ipfsClient.object.stat(cid, {timeout: '10s'})
      .then(stat => { return stat; })
      .catch(err => {
        console.log("read object stat error", err);
        return Promise.reject({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'failed to get stat for cid ' + cid
        });
      });
  } else {
    return Promise.reject({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'invalid cid ' + cid
    });
  }
};

// return if the path exists or not
const validPath = async (ipfsClient, address, userPath) => {
  if (userPath && userPath.startsWith('/') && isValid(userPath)) {
    return ipfs.fileStatByMfsPath(ipfsClient, address, userPath)
      .then(stat => {
        if (stat) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      })
      .catch(err => {
        return Promise.reject({
          code: grpc.status.INTERNAL,
          message: 'ipfs files stats read error'
        });
      });
  } else {
    return Promise.reject({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'invalid path'
    });
  }
};

const validCumulativeSize = (size) => {
  if (size >= 4) {
    return Promise.resolve();
  } else {
    return Promise.reject({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'invalid cumulativeSize'
    });
  }
};

const validInfoRequest = async (db, ipfsClient, hash, request) => {
  return validAddress(hash, request)
    .then(() => { return validTimestamp(db, request); })
    .then(() => {
      return validPath(ipfsClient, request.address, request.request.path)
        .then((exists) => {
          if (exists) {
            return Promise.resolve();
          } else {
            return Promise.reject({
              code: grpc.status.INVALID_ARGUMENT,
              message: "invalid path: path does not exist"
            });
          }
        });
    });
};

const validPinRequest = async (db, ipfsClient, hash, request) => {
  return validAddress(hash, request)
    .then(() => { return validTimestamp(db, request); })
    .then(() => { return validCid(ipfsClient, request.request.cid); })
    .then(() => { return validCumulativeSize(request.request.cumulativeSize); })
    .then(() => {
      return validPath(ipfsClient, request.address, request.request.path)
        .then((exists) => {
          if (exists) {
            return Promise.reject({
              code: grpc.status.INVALID_ARGUMENT,
              message: "invalid path: path already exist"
            });
          } else {
            if (request.request.path.endsWith('/')) {
              return Promise.reject({
                code: grpc.status.INVALID_ARGUMENT,
                message: "invalid path: path must not be directory"
              });
            } else {
              return Promise.resolve();
            }
          }
        });
    });
};

const validUnpinRequest = async (db, ipfsClient, hash, request) => {
  return validAddress(hash, request)
    .then(() => { return validTimestamp(db, request); })
    .then(() => { return validCumulativeSize(request.request.cumulativeSize); })
    .then(() => {
      return validPath(ipfsClient, request.address, request.request.path)
        .then((exists) => {
          if (exists) {
            return Promise.resolve();
          } else {
            return Promise.reject({
              code: grpc.status.INVALID_ARGUMENT,
              message: "invalid path: path does not exist"
            });
          }
        });
    });
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
  validInfoRequest(db, ipfsClient, hash, call.request)
    .then(() => ipfs.info(ipfsClient, call.request))
    .then((response) => cb(null, response))
    .catch(err => handleError(cb, err));
};

exports.pin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'PIN', call.request.request);
  const opt = {maxPending: 50, timeout: 10000};
  lock.acquire(call.request.address, () => {
    return validPinRequest(db, ipfsClient, hash, call.request)
      .then(() => ipfs.pin(ipfsClient, call.request))
  }, opt)
    .then(() => cb(null, {transaction: call.request.transaction}))
    .catch(err => handleError(cb, err));
};

exports.unpin = (db, protoRoot, ipfsClient) => (call, cb) => {
  const hash = utils.hash(protoRoot, 'UNPIN', call.request.request);
  const opt = {maxPending: 50, timeout: 10000};
  lock.acquire(call.request.address, () => {
    return validUnpinRequest(db, ipfsClient, hash, call.request)
      .then(() => ipfs.unpin(ipfsClient, call.request))
  }, opt)
    .then(() => cb(null, {transaction: call.request.transaction}))
    .catch(err => handleError(cb, err));
};
