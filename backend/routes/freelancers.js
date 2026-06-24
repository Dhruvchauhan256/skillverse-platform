const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET ALL FREELANCERS
router.get("/", async (req, res) => {
  try {
    const freelancers = await prisma.freelancerProfile.findMany({
      include: {
        user: true,
      },
    });

    res.json({
      success: true,
      data: freelancers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;