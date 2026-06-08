const express = require("express");
const router = express.Router();

console.log("✅ userRoutes.js loaded");

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User Routes Working ✅",
  });
});

module.exports = router;
