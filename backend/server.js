const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🔥 SKILLVERSE IS NOW FULLY WORKING");
});

app.listen(5000, () => {
  console.log("SERVER FRESH STARTED");
});