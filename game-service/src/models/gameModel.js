const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema(
  {
    // userId: { type: String, required: true },
    name: { type: String, required: true },
    gameType: { type: String, required: true },
  },
  { timestamps: true }
);

const Games = mongoose.model("games", gameSchema);
module.exports = Games;
