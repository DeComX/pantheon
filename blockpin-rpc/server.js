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
  server.addService(proto.BlockPin.service, {
    info: serverImpl.info(db, proto),
    pin: serverImpl.pin(db, proto),
    unpin: serverImpl.unpin(db, proto)
  });
  return server;
}

const pinServer = getServer();
pinServer.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
pinServer.start();
