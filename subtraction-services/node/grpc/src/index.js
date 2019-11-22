'use strict';

const grpc = require('grpc');
const architect = require('@architect-io/sdk').default;

const addition_service = architect.service('architect/addition-service-grpc');
const { SubtractionResponse } = architect.current_service().defs;

const subtract = (call, callback) => {
  let first = call.request.getFirst();
  let second = call.request.getSecond();
  second *= -1;

  const addition_request = new addition_service.defs.AddRequest();
  addition_request.setFirst(first);
  addition_request.setSecond(second);
  addition_service.client.add(
    addition_request,
    (error, addition_response) => {
      if (error) {
        return callback(error);
      } else {
        let response = new SubtractionResponse();
        response.setOutput(addition_response.getOutput());
        return callback(null, response);
      }
    }
  );
};

// START SERVER
const { HOST, PORT } = process.env;
const server = new grpc.Server();
architect.current_service().addService(server, { subtract });
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
