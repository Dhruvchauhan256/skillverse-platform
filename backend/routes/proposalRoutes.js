const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProposal,
  getMyProposals,
  getProjectProposals,
  acceptProposal,
  rejectProposal,
} = require("../controllers/proposalController");

router.post("/", protect, createProposal);

router.get("/my", protect, getMyProposals);

router.get(
  "/project/:projectId",
  protect,
  getProjectProposals
);

router.put(
  "/accept/:id",
  protect,
  acceptProposal
);

router.put(
  "/reject/:id",
  protect,
  rejectProposal
);

module.exports = router;