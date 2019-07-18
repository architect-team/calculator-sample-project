'use strict';

const grpc = require('grpc');
const Sequelize = require('sequelize');
const architect = require('architect-sdk').default;
const { AddResponse } = require('./architect_services/addition_service/service_pb');
const { ArchitectService } = require('./architect_services/addition_service/service_grpc_pb');
const initDatabaseModels = require('./db_models');

// Setup DB client
const primary_db_config = architect.datastore('primary');
const primary_db_client = new Sequelize('addition_service', primary_db_config.username, primary_db_config.password, {
  host: primary_db_config.host,
  port: primary_db_config.port,
  dialect: 'postgres'
});

// Setup DB models
const { RequestLog } = initDatabaseModels(primary_db_client);

// Migrate the DB to match the model
primary_db_client.sync();

// Setup GRPC Service methods
const service_impl = {

  add: (call, callback) => {
    const add_request = call.request;
    RequestLog.create({
      first: add_request.getFirst(),
      second: add_request.getSecond(),
      result: add_request.getFirst() + add_request.getSecond()
    }).then(record => {
      const response = new AddResponse();
      response.setOutput(record.result);
      callback(null, response);
    });
  }

};

// START SERVER
const { HOST, PORT } = process.env;
const server = new grpc.Server();
server.addService(ArchitectService, service_impl);
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
