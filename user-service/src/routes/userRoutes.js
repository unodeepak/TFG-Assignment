const express = require("express");
const routes = express.Router();
const userCon = require("../controller/userController");
const { checkAuth } = require("../middleware/checkAuth");
const validate = require("../middleware/validationMethod");

routes.post("/signIn", validate.signInBody, userCon.signIn);

routes.post("/signup", validate.signupBody, userCon.signup);

routes.get("/getUserByToken", checkAuth(), userCon.getUserByToken);

routes.get("/getGameByUserId/:userId", checkAuth("isNUser"), userCon.getGameByUserId);

module.exports = routes;
