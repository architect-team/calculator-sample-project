'use strict';

const grpc = require('grpc');
const architect = require('architect-sdk').default;

const subtraction_service = architect.service('subtraction-service');
const { MathResponse } = architect.current_service().defs;

const _divide_values = (result, value, magnitude, callback) => {
  if (value <= 0) {
    let divide_response = new MathResponse();
    divide_response.setOutput(result);
    return callback(null, divide_response);
  }

  subtraction_service.client.get(`/subtract?first=${value}&second=${magnitude}`)
    .catch(error => callback(error))
    .then(response => _divide_values(result + 1, response.data.result, magnitude, callback));
};

const divide = (call, callback) => {
  const math_request = call.request;
  console.log(`${math_request.getFirst()} / ${math_request.getSecond()}`);
  return _divide_values(0, math_request.getFirst(), math_request.getSecond(), callback);
};

// START SERVER
const { HOST, PORT } = process.env;
const server = new grpc.Server();
architect.current_service().addService(server, { divide });
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
