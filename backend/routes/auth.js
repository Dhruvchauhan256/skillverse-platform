const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

//
// 🚀 SIGNUP (FIXED + AUTO PROFILE CREATE)
//
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // check existing user
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // 🔥 AUTO CREATE PROFILE (IMPORTANT FIX FOR YOUR PROJECT)
    if (role === "freelancer") {
      await prisma.freelancerProfile.create({
        data: {
          userId: user.id,
          title: "",
          bio: "",
          skills: "",
          hourlyRate: 0,
          country: "",
        },
      });
    }

    if (role === "client") {
      await prisma.clientProfile.create({
        data: {
          userId: user.id,
          companyName: "",
          description: "",
        },
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

//
// 🚀 LOGIN
//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

//
// 🚀 VERIFY TOKEN
//
router.post("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;