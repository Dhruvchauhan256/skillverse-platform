const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🔥 NEW SERVER IS RUNNING (UPDATED CODE)");
});

app.listen(5000, () => {
  console.log("SERVER STARTED FRESH");
});
