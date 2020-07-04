const grpc = require('grpc');
const level = require('level-rocksdb');
const path = require('path');

const homedir = require('os').homedir();
const dbPath = path.join(homedir, 'db', 'blockpin');
const db = level(dbPath);

const Ctl = require('ipfsd-ctl')
const serverImpl = require("./server_impl");
const proto = require("./proto");

const server = new grpc.Server();
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());

Ctl.createController({
  ipfsHttpModule: require('ipfs-http-client'),
  ipfsBin: require('go-ipfs-dep').path()
}).then(ipfsd => {
  server.addService(proto.loader.BlockPin.service, {
    info: serverImpl.info(db, proto.root, ipfsd),
    pin: serverImpl.pin(db, proto.root, ipfsd),
    unpin: serverImpl.unpin(db, proto.root, ipfsd)
  });
  server.start();
});
