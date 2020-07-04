const grpc = require('grpc');
const ethers = require('ethers');

const root = require('./proto').root;
const loader = require('./proto').loader;
const client = new loader.BlockPin('127.0.0.1:50051', grpc.credentials.createInsecure());

const utils = require('./utils');

const PRIVATE_KEY = '0x0123456789012345678901234567890123456789012345678901234567890123';
const CONTENT = 'This is the content to ping';
const wallet = new ethers.Wallet(PRIVATE_KEY);

const getInfoRequest = async () => {
  const request = {
    timestampMs: new Date().getTime(),
    mfsPath: '/' // get info of root path
  };
  const hash = utils.hash(root, 'INFO', request);
  const signature = await wallet.signMessage(hash);
  return {
    address: wallet.address,
    signature: signature,
    request: request
  };
};

const info = () => {
  getInfoRequest().then(request => {
    client.info(request, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(response);
    });
  });
};

const getPingRequest = async () => {
  const timestampMs = new Date().getTime();
  const request = {
    timestampMs: timestampMs,
    mfsPath: '/', // get info of root path
    override: true,
    expireAt: timestampMs + 30 * 24 * 60 * 60 * 1000, // + 30 days
    content: content,
  };
  const signature = await wallet.signMessage(hash);
  return {
    address: wallet.address,
    signature: signature,
    request: request
  };
};

const pin = () => {
  getPinRequest().then(request => {
    client.pin(request, (error, response) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(response);
    });
  });
};

info();
