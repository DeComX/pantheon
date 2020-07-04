const grpc = require('grpc');
const level = require('level-rocksdb');
const path = require('path');

const homedir = require('os').homedir();
const dbPath = path.join(homedir, 'db', 'blockpin');
const db = level(dbPath);

const serverImpl = require("./server_impl");
const proto = require("./proto");

function getServer() {
  const server = new grpc.Server();
  server.addService(proto.loader.BlockPin.service, {
    info: serverImpl.info(db, proto.root),
    pin: serverImpl.pin(db, proto.root),
    unpin: serverImpl.unpin(db, proto.root)
  });
  return server;
}

const pinServer = getServer();
pinServer.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
pinServer.start();
