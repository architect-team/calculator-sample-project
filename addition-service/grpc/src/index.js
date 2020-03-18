'use strict';

const grpc = require('grpc');
const Sequelize = require('sequelize');
const AddResponse = require('./../service_pb').AddResponse;
const initDatabaseModels = require('./db_models');

// Setup DB client
const primary_db_client = new Sequelize(
  process.env.DB_PRIMARY_DB,
  process.env.DB_PRIMARY_USER,
  process.env.DB_PRIMARY_PASSWORD,
  {
    host: process.env.DB_PRIMARY_HOST,
    port: process.env.DB_PRIMARY_PORT,
    dialect: 'postgres',
    retry: {
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ],
      name: 'query',
      backoffBase: 100,
      backoffExponent: 1.1,
      timeout: 60000,
      max: 10
    }
  }
);

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
const grpc_pb = require('../service_grpc_pb').ArchitectService;
server.addService(grpc_pb, service_impl);
server.bind(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`Listening at ${HOST}:${PORT}`);
