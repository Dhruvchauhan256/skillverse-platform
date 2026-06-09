const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

// Mount routes (IMPORTANT: all must be valid functions)
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("SkillVerse Backend Running 🚀");
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SkillVerse API running",
  });
});

// 404 handler (KEEP AT LAST)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Loading SkillVerse Backend...");
  console.log(`🚀 Server running on port ${PORT}`);
});