'use strict';

const grpc = require('grpc');
const { AddResponse } = require('./architect_services/addition_service/service_pb');
const { ArchitectService } = require('./architect_services/addition_service/service_grpc_pb');

function add(call, callback) {
  const add_request = call.request;
  const response = new AddResponse();
  response.setOutput(add_request.getFirst() + add_request.getSecond());
  callback(null, response);
}

// START SERVER
const { HOST, PORT } = process.env;
const server = new grpc.Server();
server.addService(ArchitectService, { add });
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
