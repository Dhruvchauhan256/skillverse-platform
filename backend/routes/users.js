const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

// Get user profile
router.get("/:userId", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
        role: true,
        hourlyRate: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put("/", auth, async (req, res) => {
  try {
    const { name, bio, hourlyRate } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name || undefined,
        bio: bio || undefined,
        hourlyRate: hourlyRate || undefined,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;