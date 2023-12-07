const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const JWT_SECRET = "SecretWithJWTToken_123_@3ForGameUserdProject";

const verifyToken = async (req, res) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decode.id);
    let data = JSON.parse(JSON.stringify(user));

    if (!user) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    req.user = data;
    let role = data.userRole;
    return next();
  } catch (err) {}
};
