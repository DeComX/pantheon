const grpc = require('grpc');
const level = require('level-rocksdb');
const path = require('path');

const homedir = require('os').homedir();
const dbPath = path.join(homedir, 'db', 'blockpin');
const db = level(dbPath);

const serverImpl = require("./server_impl");
const proto = require("./proto");

const PORT = 50051;

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient('http://localhost:5001')

const server = new grpc.Server();
server.bind('127.0.0.1:' + PORT, grpc.ServerCredentials.createInsecure());

server.addService(proto.loader.BlockPin.service, {
  info: serverImpl.info(db, proto.root, ipfs),
  pin: serverImpl.pin(db, proto.root, ipfs),
  unpin: serverImpl.unpin(db, proto.root, ipfs)
});
console.log('Starting server at ' + PORT);
server.start();
