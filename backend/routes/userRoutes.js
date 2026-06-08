const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCurrentUser,
  updateFreelancerProfile,
} = require("../controllers/userController");

// Test Route
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User Routes Working ✅",
  });
});

// Current User
router.get("/me", protect, getCurrentUser);

// Freelancer Profile
router.put(
  "/freelancer/profile",
  protect,
  updateFreelancerProfile
);

module.exports = router;
