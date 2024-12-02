require("dotenv").config();
const express = require("express");
const app = express();
const { launchTelegramBot } = require("./client/telegram");

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  launchTelegramBot();
  console.log(`Server running on port ${PORT}`);
});
