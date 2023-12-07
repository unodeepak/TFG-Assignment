require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const db = require("./src/config/config");

// const PORT = process.evn.PORT;
const PORT = 3000;

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors("*"));
app.use(express.json({ limit: "250mb" }));

app.use("/user", userRoutes);

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`  === SERVER STARTED AT PORT - ${PORT} === `);
});
