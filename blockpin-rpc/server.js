const grpc = require('grpc');
const level = require('level-rocksdb');

const db = level('/db/blockpin/');
const serverImpl = require("./server_impl");
const proto = require("./proto");

function getServer() {
  const server = new grpc.Server();
  server.addProtoService(proto.blockpin.BlockPin.service, {
    getNonce: serverImpl.getNonce(db, proto),
    getInfo: serverImpl.getInfo(db, proto),
    pin: serverImpl.pin(db, proto),
    unpin: serverImpl.unpin(db, proto)
  });
  return server;
}

const pinServer = getServer();
pinServer.bind('::1:50051', grpc.ServerCredentials.createInsecure());
pinServer.start();
