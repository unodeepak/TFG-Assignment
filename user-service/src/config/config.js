const { Sequelize } = require("sequelize");
// const mysql2 = require("mysql2");

const sequelize = new Sequelize("TFG", "root", "", {
  host: "mysql",
  port: 3308,
  dialect: "mysql",
  // dialectModule: mysql2,
});

sequelize
  .sync({ after: true })
  .then(() => {})
  .catch((error) => {});

module.exports = sequelize;
