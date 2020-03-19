'use strict';

const grpc = require('grpc');
const axios = require('axios');
const { SubtractionResponse } = require('../service_pb');

const subtract = async (call, callback) => {
  let first = call.request.getFirst();
  let second = call.request.getSecond();
  second *= -1;

  try {
    const { data } = await axios.get(`http://${process.env.ADDITION_SERVICE_ADDRESS}/add?first=${first}&second=${second}`);
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
const grpc_pb = require('../service_grpc_pb').ArchitectService;
server.addService(grpc_pb, { subtract });
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
