const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const JWT_SECRET = "SecretWithJWTToken_123_@3ForGameUserdProject";

exports.checkAuth = () => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(403).json({ msg: "Token not found", success: false });
      }

      const decode = jwt.verify(token, JWT_SECRET);
      const user = await User.findOne({ where: { id: decode?.id } });
      let data = JSON.parse(JSON.stringify(user));

      if (!user) {
        return res.status(401).json({ msg: "Invalid Token" });
      }

      /* Start for Given Permission */
      req.user = data;
      return next();
    } catch (err) {
      return res.status(401).json({
        status: false,
        err: err.message,
      });
    }
  };
};
