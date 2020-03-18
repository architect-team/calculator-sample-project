'use strict';

const grpc = require('grpc');
const axios = require('axios');
const MathResponse = require('./../service_pb').MathResponse;

const _divide_values = (result, value, magnitude, callback) => {
  if (value <= 0) {
    let divide_response = new MathResponse();
    divide_response.setOutput(result);
    return callback(null, divide_response);
  }

  axios.get(`${process.env.SUBTRACTION_SERVICE_ADDRESS}/subtract?first=${value}&second=${magnitude}`)
    .catch(error => callback(error))
    .then(response => _divide_values(result + 1, response.data.result, magnitude, callback));
};

const divide = (call, callback) => {
  const math_request = call.request;
  return _divide_values(0, math_request.getFirst(), math_request.getSecond(), callback);
};

// START SERVER
const { HOST, PORT } = process.env;
const server = new grpc.Server();
const grpc_pb = require('../service_grpc_pb').ArchitectService;
server.addService(grpc_pb, divide);
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
