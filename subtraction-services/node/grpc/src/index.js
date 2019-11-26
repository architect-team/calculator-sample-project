'use strict';

const grpc = require('grpc');
const architect = require('@architect-io/sdk').default;

const addition_service = architect.service('architect/addition-service-rest');
const { SubtractionResponse } = architect.current_service().defs;

const subtract = async (call, callback) => {
  console.log('test');
  let first = call.request.getFirst();
  let second = call.request.getSecond();
  second *= -1;

  try {
    const { data } = await addition_service.client.get(`/add?first=${first}&second=${second}`);
    const res = new SubtractionResponse();
    res.setOutput(data.result);
    callback(null, res);
  } catch (error) {
    callback(error);
  }
};

// START SERVER
const { HOST, PORT } = process.env;
const server = new grpc.Server();
architect.current_service().addService(server, { subtract });
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
