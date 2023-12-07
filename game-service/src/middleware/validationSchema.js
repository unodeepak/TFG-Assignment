const Joi = require("joi");

exports.createGameSchema = Joi.object({
  name: Joi.string().trim().required(),
  gameType: Joi.string().trim().required(),
});

exports.updateGameByGameIdSchema = Joi.object({
  gameId: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  gameType: Joi.string().trim().required(),
});
