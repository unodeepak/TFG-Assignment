require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;
const receiveMessage = require("./src/queue/subscriber");
app.use(express.json({ limit: "250mb" }));

receiveMessage("registration_queue");

app.listen(PORT, () => {
    console.log(`Event Process is running on port ${PORT}`);
});