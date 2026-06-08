const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCurrentUser,
  updateFreelancerProfile,
} = require("../controllers/userController");

// TEST ROUTE
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User Routes Working ✅",
  });
});

// GET CURRENT USER
router.get("/me", protect, getCurrentUser);

// UPDATE FREELANCER PROFILE
router.put(
  "/freelancer/profile",
  protect,
  updateFreelancerProfile
);

module.exports = router;