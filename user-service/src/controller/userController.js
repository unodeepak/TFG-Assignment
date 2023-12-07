const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");
const publishedMessage = require("../queue/publishedMessage");

// JWT_SECRET = process.env.JWT_SECRET;
// JWT_EXPIRE = process.env.JWT_EXPIRE;

// JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
// JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE;


const JWT_SECRET = "SecretWithJWTToken_123_@3ForGameUserdProject";
const JWT_EXPIRE = "1h";

const JWT_REFRESH_SECRET = "RefreshtokenForUsedinGame_783kdkProjectW";
const JWT_REFRESH_EXPIRE = "10d";

/* Convert Plain Text password to Hash */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  pass = await bcrypt.hash(password, salt);

  return pass;
};

const matchPassword = async (plainPass, hashPass) => {
  return await bcrypt.compare(plainPass, hashPass);
};

const getSignedJwtToken = (user) => {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};

const getSignedJwtRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRE,
  });

  return refreshToken;
};

/* User stated to create account */
exports.signup = async (req, res) => {
  try {
    let { username, email } = req.body;
    username = username?.toLowerCase();
    email = email?.toLowerCase();

    const existUser = await Users.findOne({
      where: { [Sequelize.Op.or]: [{ username }, { email }] },
      attributes: ["email", "username"],
    });

    /* Check the User or email already exists or not */
    if (existUser) {
      let msg = `Email ${email} already exists`;
      if (existUser.username == username) {
        msg = `Username ${username} already exists`;
      }
      return res.status(409).json({ msg, success: false });
    }

    req.body.password = await hashPassword(req.body.password);
    const data = await Users.create(req.body);
    const token = getSignedJwtToken(data);
    const refreshToken = getSignedJwtRefreshToken(data);

    await publishedMessage("user_events", username);

    return res.status(201).json({
      msg: "Account Created Successful",
      data,
      token,
      refreshToken,
      success: true,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ msg: err.message, success: false });
  }
};

/* User started to login with username or email */
exports.signIn = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username && !email) {
      return res
        .status(400)
        .json({ msg: "username or email is required", success: false });
    }

    let user;
    let msg;
    if (username) {
      username = username?.toLowerCase();
      user = await Users.findOne({
        where: { username },
      });
      msg = `username ${username} is not exists`;
    } else {
      email = email?.toLowerCase();
      user = Users.findOne({
        where: { email },
      });
      msg = `email ${email} is not exists`;
    }

    if (!user) {
      return res.status(401).json({ msg, success: false });
    }

    const match = await matchPassword(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ msg: "Email or password incorrect", success: false });
    }

    const token = getSignedJwtToken(data);
    const refreshToken = getSignedJwtRefreshToken(data);

    return res.status(201).json({
      msg: "Account Created Successful",
      data: user,
      token,
      refreshToken,
      success: true,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getGameByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await axios.get(
      `http://localhost:5000/game/getGames/${userId}`
    );

    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
    console.log("Error is ", err);
  }
};

exports.getUserByToken = async (req, res) => {
  return res.status(200).json({ data: req.user, success: true });
};
