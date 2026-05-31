console.log("STEP 1: FILE LOADED");

const express = require("express");
console.log("STEP 2: EXPRESS LOADED");

const app = express();

app.get("/", (req, res) => {
  res.send("SkillVerse Running");
});

app.listen(5000, () => {
  console.log("STEP 3: SERVER STARTED");
});
