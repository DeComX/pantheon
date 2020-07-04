const ethers = require('ethers');

const requestType = (type) => {
  if (type === 'INFO') {
    return 'decomx.blockpin.InfoRequest.Request';
  } else if (type === 'PIN') {
    return 'decomx.blockpin.PinRequest.Request';
  } else if (type === 'UNPIN') {
    return 'decomx.blockpin.UnpinRequest.Request';
  } else {
    throw 'invalid request type';
  }
}

exports.hash = (root, type, request) => {
  const Request = root.lookupType(requestType(type));
  const message = Request.encode(Request.fromObject(request)).finish();
  return ethers.utils.keccak256(message);
};
