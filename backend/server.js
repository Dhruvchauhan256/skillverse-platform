const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log("🚀 Loading SkillVerse Backend...");
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES IMPORT
const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const projectRoutes = require("./routes/projectRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// ROUTES USE
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);

// TEST ROUTES
app.get("/", (req, res) => {
  res.send("SkillVerse Backend Running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

const prisma = require("./prisma/client");

app.get("/test-users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});