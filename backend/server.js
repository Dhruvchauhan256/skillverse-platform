const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
console.log("✅ Loading user routes...");
app.use("/api/users", userRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

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

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.get("/api/debug", (req, res) => {
  res.json({
    success: true,
    message: "Debug route working",
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
