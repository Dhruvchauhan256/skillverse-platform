const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProposal,
  getMyProposals,
} = require("../controllers/proposalController");

router.post("/", protect, createProposal);

router.get("/my", protect, getMyProposals);

module.exports = router;