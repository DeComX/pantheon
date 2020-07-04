const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const protobuf = require("protobufjs");

const PROTO_PATH = __dirname + '/../proto/blockpin.proto';

const OPTIONS = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, OPTIONS);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
exports.loader = protoDescriptor.decomx.blockpin;

const root = protobuf.loadSync(PROTO_PATH);
exports.root = root;
