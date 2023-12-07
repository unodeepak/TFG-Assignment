const validationSchema = require("./validationSchema");

exports.createGameBody = async (req, res, next) => {
  const { error } = validationSchema.createGameSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });

  next();
};

exports.updateGameByGameIdBody = async (req, res, next) => {
    const { error } = validationSchema.updateGameByGameIdSchema.validate(req.body);
  
    if (error)
      return res
        .status(400)
        .json({ msg: error?.details?.[0].message, success: false });
  
    next();
  };