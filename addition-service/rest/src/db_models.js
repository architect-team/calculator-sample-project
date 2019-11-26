const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const RequestLog = sequelize.define('request_log', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    first: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    second: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    result: {
      type: Sequelize.INTEGER
    }
  });

  return {
    RequestLog
  };
};
