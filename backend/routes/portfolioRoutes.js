const express = require("express");
const router = express.Router();

const {
  createPortfolio,
  getMyPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

router.post("/", createPortfolio);
router.get("/", getMyPortfolio);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);

module.exports = router;
