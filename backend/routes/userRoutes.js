const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCurrentUser,
  updateFreelancerProfile,
} = require("../controllers/userController");

// Current User
router.get("/me", protect, getCurrentUser);

// Freelancer Profile
router.put(
  "/freelancer/profile",
  protect,
  updateFreelancerProfile
);

module.exports = router;