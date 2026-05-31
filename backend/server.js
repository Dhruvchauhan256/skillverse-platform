const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SkillVerse Backend Running 🚀");
});

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on http://localhost:" + PORT);
});
