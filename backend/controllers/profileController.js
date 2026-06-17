const prisma = require("../prisma/client");
const { logError } = require("../utils/logger");

exports.createProfile = async (req, res) => {
  try {
    const { title, bio, skills, hourlyRate, country } = req.body;
    const userId = req.user.id;

    if (!title || !bio || !skills || !hourlyRate || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existing = await prisma.freelancerProfile.findUnique({
      where: { userId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const profile = await prisma.freelancerProfile.create({
      data: {
        title,
        bio,
        skills,
        hourlyRate: Number(hourlyRate),
        country,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      profile,
    });
  } catch (error) {
    logError("CREATE PROFILE", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await prisma.freelancerProfile.findUnique({
      where: { userId: req.user.id },
    });

    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    logError("GET MY PROFILE", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
