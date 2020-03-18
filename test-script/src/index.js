'use strict';

const { MathRequest } = require('./../service_pb');

const first = 50;
const second = 5;

setTimeout(() => {
  console.log(`Dividing ${first} by ${second}...`);
  let request = new MathRequest();
  request.setFirst(first);
  request.setSecond(second);

  const division_client = require('../service_grpc_pb').ArchitectClient;
  division_client.divide(request, (error, response) => {
    if (error) {
      return console.error(error);
    }

    console.log(response.getOutput());
  });
}, 10000);


