const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");
// const supabaseAdmin = require("../utils/supabaseAdmin");
const { logError } = require("../utils/logger");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, and Password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "freelancer",
      },
    });

    if (user.role === "freelancer") {
      // Create Prisma freelancer profile (used by dashboard stats etc)
      await prisma.freelancerProfile.create({
        data: {
          userId: user.id,
          title: "New Freelancer",
          bio: "Add your bio",
          skills: "React, Node.js",
          hourlyRate: 10,
          country: "India",
        },
      });

      // Create matching Supabase profile row (used by public profile page)
      // TEMPORARILY DISABLED — Supabase is down, will re-enable when back online
      /*
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
          user_id: user.id,
          name: user.name,
          title: "New Freelancer",
          bio: "Add your bio",
          hourly_rate: 0,
          skills: [],
        });

      if (profileError) {
        // Don't fail the whole registration if this fails —
        // the frontend has a fallback "create profile" flow too
        logError("CREATE SUPABASE PROFILE", profileError);
      }
      */
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    logError("REGISTER", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    logError("LOGIN", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};