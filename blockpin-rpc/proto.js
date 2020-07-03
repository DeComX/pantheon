const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/../protos/blockpin.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

exports.blockpin = protoDescriptor.blockpin;
