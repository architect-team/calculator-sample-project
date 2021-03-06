const express = require("express");
const bodyParser = require("body-parser");
const { AddRequest } = require('../service_pb');
const grpc = require('grpc');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/subtract', (req, res) => {
  let { first, second } = req.query;
  second *= -1;

  const addition_request = new AddRequest();
  addition_request.setFirst(first);
  addition_request.setSecond(second);

  const { ArchitectClient } = require('../service_grpc_pb');
  const addition_client = new ArchitectClient(
    process.env.ADDITION_SERVICE_ADDRESS,
    grpc.credentials.createInsecure()
  );

  addition_client.add(
    addition_request,
    (error, addition_response) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).json({
          result: addition_response.getOutput()
        });
      }
    }
  );
});

const { HOST, PORT } = process.env;
app.listen(PORT, () => {
  console.log('Listening at %s:%s', HOST, PORT);
});
