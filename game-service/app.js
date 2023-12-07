require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const gameRoutes = require("./src/routes/gameRoutes");
const mongoose = require("mongoose");
const PORT = 5004;
const MONGO_URL = "mongodb://mongodb/TFG";
// const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL = "mongodb://localhost:27017/TFG";
const cors = require("cors");

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.get("/", async (req, res) => {
  return res.status(200).json({ msg: "TEST_PAGE", success: false });
});

app.use(cors("*"));
app.use(express.json({ limit: "250mb" }));

app.use("/game", gameRoutes);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("Mongo DB successfully Connected");

    app.listen(PORT, () => {
      console.log(`  === SERVER STARTED AT PORT - ${PORT} === `);
    });
  } catch (err) {
    console.log(err);
  }
};

connectToDatabase();
