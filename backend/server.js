const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("SkillVerse Backend Running 🚀");
});

const PORT = 5000;

// FORCE IPv4 binding
app.listen(PORT, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:" + PORT);
});
