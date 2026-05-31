const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SkillVerse Backend is Running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
