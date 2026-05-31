const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillVerse API Running 🚀"
  });
});
const PORT = 5000;

// FORCE IPv4 binding
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:" + PORT);
});
