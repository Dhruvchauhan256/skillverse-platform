const prisma = require("../prisma/client");

// CREATE PROFILE
exports.createFreelancerProfile = async (req, res) => {
  try {
    const { title, bio, skills, hourlyRate, country } = req.body;

    if (!title || !bio || !skills) {
      return res.status(400).json({
        success: false,
        message: "Title, bio, skills required",
      });
    }

    const profile = await prisma.freelancerProfile.create({
      data: {
        title,
        bio,
        skills,
        hourlyRate: Number(hourlyRate) || 0,
        country,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      profile,
    });

  } catch (error) {
    console.log("PROFILE CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message, // IMPORTANT for debugging
    });
  }
};

// GET PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await prisma.freelancerProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      success: true,
      profile,
    });

  } catch (error) {
    console.log("GET PROFILE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
