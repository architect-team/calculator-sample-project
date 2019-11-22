const architect = require('@architect-io/sdk').default;
const express = require("express");
const bodyParser = require("body-parser");

const addition_service = architect.service('architect/addition-service-grpc');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/subtract', (req, res) => {
  let { first, second } = req.query;
  second *= -1;

  const addition_request = new addition_service.defs.AddRequest();
  addition_request.setFirst(first);
  addition_request.setSecond(second);
  addition_service.client.add(
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
