'use strict';

const architect = require('@architect-io/sdk').default;

const first = 50;
const second = 5;

setTimeout(() => {
  console.log(`Dividing ${first} by ${second}...`);
  const division_service = architect.service('architect/division-service');
  let request = new division_service.defs.MathRequest();
  request.setFirst(first);
  request.setSecond(second);
  division_service.client.divide(request, (error, response) => {
    if (error) {
      return console.error(error);
    }

    console.log(response.getOutput());
  });
}, 10000);


