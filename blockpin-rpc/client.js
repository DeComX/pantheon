const proto = require("./proto");
const ethers = require('ethers');

const PRIVATE_KEY = "0x0123456789012345678901234567890123456789012345678901234567890123";
const client = new protol.BlockPin('::1:50051', grpc.credentials.createInsecure());
const wallet = new ethers.Wallet(PRIVATE_KEY);

exports.run = () => {
  const RequestType = proto.lookupType('decomx.blockpin.InfoRequest.Request');
  const request = {
    timestampUs: new Date.getTime(),
    mfsPath: "/" // get info of root
  };
  const message = RequestType.encode(RequestType.fromObject(request));
  const signature = await wallet.signMessage(message);

  client.info({
    address: wallet.address(),
    signature: signature,
    request: request
  }, (error, response) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(response);
  });
}
