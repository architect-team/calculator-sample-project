const express = require("express");
const Sequelize = require('sequelize');
const bodyParser = require("body-parser");
const architect = require('@architect-io/sdk').default;
const initDatabaseModels = require('./db_models');

// Setup DB client
const primary_db_config = architect.datastore('primary');
const primary_db_client = new Sequelize(
  primary_db_config.name,
  primary_db_config.username,
  primary_db_config.password,
  {
    host: primary_db_config.host,
    port: primary_db_config.port,
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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/add', async (req, res) => {
  const { first, second } = req.query;
  const result = parseInt(first) + parseInt(second);

  try {
    const record = await RequestLog.create({ first, second, result });
    return res.status(200).json({ result: record.result });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ result });
  }
});

const { HOST, PORT } = process.env;
app.listen(PORT, () => {
  console.log('Listening at %s:%s', HOST, PORT);
});
