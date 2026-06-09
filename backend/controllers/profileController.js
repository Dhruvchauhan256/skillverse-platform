const prisma = require("../prisma/client");

// CREATE PROFILE
exports.createProfile = async (req, res) => {
  try {
    const { title, bio, skills, hourlyRate, country } = req.body;

    const userId = req.user.id;

    // check user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check existing profile
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

    res.json({
      success: true,
      profile,
    });

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PROFILE
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
    console.log(error);
    res.status(500).json({ success: false });
  }
};
