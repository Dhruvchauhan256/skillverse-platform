const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getCurrentUser,
  updateFreelancerProfile,
  updateClientProfile,
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

// Freelancer Profile Update
router.put("/freelancer/profile", protect, updateFreelancerProfile);

// Client Profile Update ✅ NEW
router.put("/client/profile", protect, updateClientProfile);

module.exports = router;
