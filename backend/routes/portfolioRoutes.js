const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createPortfolio,
  getMyPortfolio,
  deletePortfolio,
  updatePortfolio,
} = require("../controllers/portfolioController");

// MUST USE protect middleware
router.post("/", protect, createPortfolio);
router.get("/", protect, getMyPortfolio);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

module.exports = router;
