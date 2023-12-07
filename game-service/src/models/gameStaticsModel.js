const mongoose = require("mongoose");
const gameStaticsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    gameId: { type: mongoose.Types.ObjectId, required: true },
    score: { type: Number, default: 0 },
    duration: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const GameStatics = mongoose.model("game_statics", gameStaticsSchema);
module.exports = GameStatics;
