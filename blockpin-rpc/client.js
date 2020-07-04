const grpc = require("grpc");
const ethers = require('ethers');

const proto = require("./proto");
const client = new proto.loader.BlockPin('127.0.0.1:50051', grpc.credentials.createInsecure());

const PRIVATE_KEY = "0x0123456789012345678901234567890123456789012345678901234567890123";

const getRequest = async () => {
  const wallet = new ethers.Wallet(PRIVATE_KEY);
  const request = {
    timestampUs: new Date().getTime(),
    mfsPath: "/" // get info of root path
  };
  const Request = proto.root.lookupType("decomx.blockpin.InfoRequest.Request");
  const message = Request.encode(Request.fromObject(request)).finish();
  const hash = ethers.utils.keccak256(message);
  const signature = await wallet.signMessage(hash);
  return {
    address: wallet.address,
    signature: signature,
    request: request
  };
};

getRequest().then(request => {
  client.info(request, (error, response) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(response);
  });
});
