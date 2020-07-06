const grpc = require('grpc');
const ethers = require('ethers');
const { promisify } = require('util');

const root = require('./proto').root;
const loader = require('./proto').loader;
const Client = new loader.BlockPin('127.0.0.1:50051', grpc.credentials.createInsecure());

const utils = require('./utils');

const PRIVATE_KEY = '0x0123456789012345678901234567890123456789012345678901234567890123';
const CONTENT = 'This is the content to ping';
const wallet = new ethers.Wallet(PRIVATE_KEY);

const promisifyAll = (client) => {
    const to = {};
    for (var k in client) {
        if (typeof client[k] != 'function') continue;
        to[k] = promisify(client[k].bind(client));
    }
    return to;
};

const client = promisifyAll(Client);

const getInfoRequest = async (path, listChildren, timestampUs) => {
  const request = {
    path: path,
    timestampMs: timestampUs || new Date().getTime(),
    listChildren: listChildren || false
  };
  const hash = utils.hash(root, 'INFO', request);
  const signature = await wallet.signMessage(hash);
  return {
    address: wallet.address,
    signature: signature,
    request: request
  };
};

const info = (path, listChildren, timestampUs) => {
  getInfoRequest(path, listChildren, timestampUs)
    .then(request => {
      return client.info(request)
        .then(response => {
          console.log("------------------- info: " + path);
          console.log(response);
          console.log("-------------------- done \n\n\n");
        })
        .catch(err => {
          console.log("------------------- info: " + path);
          console.log(err);
          console.log("-------------------- done \n\n\n");
        });
    });
};

const getPinRequest = async (cid, size, override) => {
  const timestampMs = new Date().getTime();
  const request = {
    timestampMs: timestampMs,
    override: override || false,
    cumulativeSize: size,
    cid: cid,
    path: "/test"
  };
  const hash = utils.hash(root, 'PIN', request);
  const signature = await wallet.signMessage(hash);
  return {
    address: wallet.address,
    signature: signature,
    request: request
  };
};

const pin = (cid, size, override) => {
  return getPinRequest(cid, size, override).then(request => {
    return client.pin(request)
      .then(response => {
        console.log("------------------- pin: " + cid);
        console.log(response);
        console.log("-------------------- done \n\n\n");
      })
      .catch(err => {
        console.log("------------------- pin: " + cid);
        console.log(err);
        console.log("-------------------- done \n\n\n");
      });
  });
};

const getUnpinRequest = async (path, size) => {
  const request = {
    timestampMs: new Date().getTime(),
    path: path,
    cumulativeSize: size
  };
  const hash = utils.hash(root, 'UNPIN', request);
  const signature = await wallet.signMessage(hash);
  return {
    address: wallet.address,
    signature: signature,
    request: request
  };
};

const unpin = (path, size) => {
  return getUnpinRequest(path, size).then(request => {
    return client.unpin(request)
      .then(response => {
        console.log("------------------- unpin: " + path);
        console.log(response);
        console.log("-------------------- done \n\n\n");
      })
      .catch(err => {
        console.log("------------------- unpin: " + path);
        console.log(err);
        console.log("-------------------- done \n\n\n");
      });
  });
};

const runInfoTest = async () => {
};

const runTest = async (path, size) => {
  const CID1 = "QmPxma8L25Z9fqv1EfBHLL3fR6JaZofwHZbhvJGkqbGBNU"; // 310
  const CID2 = "QmNZYpqCZE5vpcMDG2yVsRSD1zmSZ2b5dNBQNbWFPG1cgV"; // 175
  const INVALID_CID = "QmNZYpqCZE5vpcMDG2yVsRSD1zmSZ2b5dNBQN";
  await pin(CID1, 310, true);
  await pin(CID2, 175, false); // will throw
  await pin(CID2, 175, true); // will override
  await pin(CID2, 175, true); // identical, nothing happened
  await pin(CID2, 175, false); // identical but still will throw
  await pin(CID2, 275, true); // invalid size, will throw
  await pin(INVALID_CID, 300, true); // invalid cid

  await info("/", false);
  await info("/", true);
  await info("/test/", false);
  await info("/test/", true);
  await info("/test/inside/message.txt", false);
  await info("/test/inside/message.txt", true);
  await info("/invalid_path");
  await info("/test", true, new Date().getTime() - 600000);

  await unpin("/test/inside", 54);
  await unpin("/test", 4, true);
};

runTest()
  .then(() => console.log("test finished"))
  .catch(err => console.log(err));
