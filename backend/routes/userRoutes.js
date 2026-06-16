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

// Add this import at top
const { updateClientProfile } = require("../controllers/userController");

// Add this route
router.put("/client/profile", protect, updateClientProfile);

// Current User
router.get("/me", protect, getCurrentUser);

// Freelancer Profile
router.put(
  "/freelancer/profile",
  protect,
  updateFreelancerProfile
);

module.exports = router;
