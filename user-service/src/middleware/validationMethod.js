const validationSchema = require("./validationSchema");

exports.signupBody = async (req, res, next) => {
  const { error } = validationSchema.signupSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });

  next();
};

exports.signInBody = async (req, res, next) => {
  const { error } = validationSchema.signupSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });

  next();
};