console.log("SERVER FILE IS RUNNING");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SkillVerse Backend is Running 🚀");
});

app.listen(5000, () => {
  console.log("SERVER STARTED ON PORT 5000");
});
