const Joi = require("joi");

exports.signupSchema = Joi.object({
  username: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  password: Joi.string().required(),
});

exports.signInSchema = Joi.object({
  username: Joi.string().trim().allow(null),
  email: Joi.string().email().trim().allow(null),
  password: Joi.string().required(),
});