const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillVerse API Running 🚀"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
