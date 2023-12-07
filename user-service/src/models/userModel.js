const sequelize = require("../config/config.js");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  username: { type: DataTypes.STRING, unique: true, required: true },
  firstName: { type: DataTypes.STRING, required: true },
  lastName: { type: DataTypes.STRING, required: true },
  gender: {
    type: DataTypes.STRING,
    required: true,
    validate: {
      isIn: [["male", "female", "other"]],
    },
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    unique: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  password: { type: DataTypes.STRING, required: true },
});

Users.beforeCreate((user, options) => {
  if (user.email) {
    user.email = user.email.toLowerCase();
  }

  if (user.username) {
    user.username = user.username.toLowerCase();
  }
});

Users.beforeUpdate((user, options) => {
  if (user.changed('email')) {
    user.email = user.email.toLowerCase();
  }

  if (user.changed('username')) {
    user.username = user.username.toLowerCase();
  }
});

module.exports = Users;
