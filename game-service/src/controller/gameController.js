const Game = require("../models/gameModel");
const GameStatics = require("../models/gameStaticsModel");

exports.createGame = async (req, res) => {
  try {
    const { name, gameType } = req.body;
    await Game.create({ name, gameType });

    return res.status(201).json({ msg: "Game Created", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getGames = async (req, res) => {
  try {
    const data = await Game.find({});
    return res.status(201).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.playGame = async (req, res) => {
  try {
    const { gameId } = req.body;

    /* Check Given Game is exist or not */
    const isExistsGameId = await Game.findById(gameId);
    if (!isExistsGameId) {
      return res.status(400).json({ msg: "Invalid Game", success: false });
    }

    const data = await GameStatics.create({ userId: req.user.id, gameId });
    return res.status(201).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getGames = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await GameStatics.find({ userId });

    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.updateGameByGameId = async (req, res) => {
  try {
    const { gameId, score } = req.body;
    const data = await Game.findById(gameId);
    if (!data) {
      return res.status(400).json({ msg: "Invalid Game Id", success: false });
    }

    await GameStatics.findByIdAndUpdate(gameId, { $set: { score } });

    return res
      .status(200)
      .json({ msg: "Data updated Successfully", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.deleteGameById = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const data = await Game.findById(gameId);
    if (!data) {
      return res.status(400).json({ msg: "Invalid Game Id", success: false });
    }

    await Game.findByIdAndDelete(gameId);

    return res
      .status(200)
      .json({ msg: "Game Deleted Successfully", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
