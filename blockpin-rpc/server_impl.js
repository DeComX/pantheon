const ethers = require('ethers');
const rocksdb = require('./db');

const verifyAddress = (ProtoType, request) => {
  const message = ProtoType.encode(ProtoType.fromObject(request.request)).finish();
  const hash = ethers.utils.keccak256(message);
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
        if (request.request.timestampUs > lastTimestamp) {
            return rocksdb.updateTimestamp(
              db, request.address, request.request.timestampUs
            )
        } else {
          return Promise.reject({
            code: 'AUTH_FAILURE', message: 'invalid timestamp'
          });
        }
      });
};

const verify = (db, ProtoType, request) => {
  return verifyAddress(ProtoType, request)
    .then(() => {
      return verifyTimestamp(db, request);
    });
};

const dummy_info_response = () => {
  return {
    mfsPath: "/dir/",
    byteSize: 1000,
    mtime: new Date().getTime()
  };
};

exports.info = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.InfoRequest.Request');
  verify(db, RequestType, call.request)
    .then(() => cb(null, dummy_info_response()))
    .catch(err => cb(err));
};

exports.pin = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.PinRequest.Request');
  verify(db, RequestType, call.request)
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};

exports.unpin = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.UnpinRequest.Request');
  verify(db, RequestType, call.request)
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};
