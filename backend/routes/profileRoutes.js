/* const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getMyProfile } = require("../controllers/profileController");

router.get("/me", protect, getMyProfile);

module.exports = router; */


router.get("/me", protect, getMyProfile);

exports.getMyProfile = async (req, res) => {
  try {
    const user = await prisma.user.findFirst();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
