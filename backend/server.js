const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

console.log("🚀 Loading SkillVerse Backend...");

// =======================
// MIDDLEWARE (IMPORTANT: must be before routes)
// =======================
app.use(cors());
app.use(express.json());

// =======================
// ROUTES IMPORT
// =======================
const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

// =======================
// API ROUTES
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);

// =======================
// TEST ROUTES
// =======================
app.get("/", (req, res) => {
  res.send("SkillVerse Backend Running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected Successfully ✅",
  });
});

// =======================
// 404 HANDLER (MUST BE LAST)
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
