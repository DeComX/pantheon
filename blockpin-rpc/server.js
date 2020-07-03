// load proto root
var PROTO_PATH = __dirname + '/../protos/blockpin.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var blockpin = protoDescriptor.blockpin;

// start server
function getServer() {
  var server = new grpc.Server();
  server.addProtoService(blockpin.BlockPin.service, {
    getNonce: getNonce,
    getInfo: getInfo,
    pin: pin,
    unpin: unpin
  });
  return server;
}

var pinServer = getServer();
pinServer.bind('::1:50051', grpc.ServerCredentials.createInsecure());
pinServer.start();
