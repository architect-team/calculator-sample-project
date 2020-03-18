const express = require("express");
const Sequelize = require('sequelize');
const bodyParser = require("body-parser");
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
