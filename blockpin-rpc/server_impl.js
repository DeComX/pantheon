const ethers = require('ethers');
const rocksdb = require('./db');
const sha1 = require('js-sha1');

const verifyAddress = (ProtoType, request) => {
  return new Promise((resolve, reject) => {
    const hash = sha1(protoType.encode(request.request)).hex();
    if (request.address === ethers.utils.verifyMessage(hash, request.signature)) {
      resolve();
    } else {
      reject({code: 'AUTH_FAILURE', message: 'invalid signature'});
    }
  });
}

const verifyNonce = (db, request) => {
  return new Promise((resolve, reject) => {
    rocksdb.getNonce(db, request.address)
      .then((curNonce) => {
        if (request.request.nonce === curNonce) {
          resolve();
        } else {
          reject({code: 'AUTH_FAILURE', message: 'invalid nonce'});
        }
      });
  });
}

const verify = (db, ProtoType, request) => {
  return verifyAddress(ProtoType, request)
    .then(() => return verifyNonce(db, request)).
}

exports.getNonce = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.GetNonceRequest.Request');
  verifyAddress(RequestType, request)
    .then(() => return rocksdb.getNonce(db, address))
    .then((nonce) => cb(null, {nonce: nonce}))
    .catch(err => cb(err));
}

exports.getInfo = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.GetInfoRequest.Request');
  verify(db, RequestType, request)
    .then(() => return updateNonce(db, request.address, request.request.nonce))
    .then((newNonce) => cb(null, {nonce: newNonce}))
    .catch(err => cb(err));
}

exports.pin = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.PinRequest.Request');
  verify(db, RequestType, request)
    .then(() => return updateNonce(db, request.address, request.request.nonce))
    .then((newNonce) => cb(null, {nonce: newNonce}))
    .catch(err => cb(err));
}

exports.unpin = (db, proto) => (call, cb) => {
  const RequestType = proto.lookupType('decomx.blockpin.UnpinRequest.Request');
  verify(db, RequestType, request)
    .then(() => return updateNonce(db, request.address, request.request.nonce))
    .then((newNonce) => cb(null, {nonce: newNonce}))
    .catch(err => cb(err));
}
