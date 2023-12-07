const express = require("express");
const routes = express.Router();
const gameCon = require("../controller/gameController");
const validate = require("../middleware/validationMethod");
const { checkAuth } = require("../middleware/checkAuth");

routes.post("/createGame", validate.createGameBody, gameCon.createGame);

routes.post("/playGame", checkAuth(), gameCon.playGame);

routes.get("/getGames/:userId", checkAuth(), gameCon.getGames);

routes.post(
  "/updateGameByGameId",
  checkAuth(),
  validate.updateGameByGameIdBody,
  gameCon.updateGameByGameId
);

routes.delete("/deleteGameById/:gameId", checkAuth(), gameCon.deleteGameById);

module.exports = routes;
