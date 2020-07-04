const ethers = require('ethers');
const rocksdb = require('./db');
const sha1 = require('js-sha1');

const verifyAddress = (ProtoType, request) => {
  const binaryData = ProtoType.encode(ProtoType.fromObject(request.request));
  const hash = sha1(binaryData).hex();
  if (request.address === ethers.utils.verifyMessage(hash, request.signature)) {
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

const dummy_info_response = (mfsPath) => {
  return {
    mfsPath: mfsPath,
    byteSize: 1000,
    mtime: new Date().getTime()
  };
};

exports.info = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.InfoRequest.Request');
  verify(db, RequestType, request)
    .then(() => cb(null, dummy_info_response(request.request.mfsPath)))
    .catch(err => cb(err));
};

exports.pin = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.PinRequest.Request');
  verify(db, RequestType, request)
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};

exports.unpin = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.UnpinRequest.Request');
  verify(db, RequestType, request)
    .then(() => cb(null, {}))
    .catch(err => cb(err));
};
