const axios = require("axios");

exports.checkAuth = () => {
  return async (req, res, next) => {
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

    try {
      const user = await axios.get(
        "http://localhost:3000/user/getUserByToken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (user.status != 200) {
        return res.status(401).json({ msg: "Invalid Token" });
      }

      req.user = user?.data?.data;
      return next();
    } catch (err) {
      return res.status(401).json({
        status: false,
        err: err.message,
      });
    }
  };
};
