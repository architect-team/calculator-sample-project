const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/add', (req, res) => {
  let { first, second } = req.query;
  first = parseInt(first);
  second = parseInt(second);

  return res.status(200).json({
    result: parseInt(first) + parseInt(second)
  });
});

const { HOST, PORT } = process.env;
app.listen(PORT, () => {
  console.log('Listening at %s:%s', HOST, PORT);
});
