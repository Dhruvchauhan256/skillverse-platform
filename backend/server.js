const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("SkillVerse Backend Running 🚀");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillVerse API is running successfully",
  });
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend Connected Successfully ✅",
  });
});

// Future Routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
