'use strict';

const { MathRequest } = require('./../service_pb');
const grpc = require('grpc');

const first = 50;
const second = 5;

setTimeout(() => {
  console.log(`Dividing ${first} by ${second}...`);
  let request = new MathRequest();
  request.setFirst(first);
  request.setSecond(second);

  const { ArchitectClient } = require('../service_grpc_pb');
  const division_client = new ArchitectClient(
    process.env.DIVISION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
  );

  division_client.divide(request, (error, response) => {
    if (error) {
      return console.error(error);
    }

    console.log(response.getOutput());
  });
}, 10000);


