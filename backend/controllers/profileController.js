const prisma = require("../prisma/client");

// CREATE FREELANCER PROFILE
exports.createFreelancerProfile = async (req, res) => {
  try {
    const { title, bio, skills, hourlyRate, country } = req.body;

    if (!title || !bio || !skills) {
      return res.status(400).json({
        success: false,
        message: "Title, bio, and skills are required",
      });
    }

    // check if profile already exists
    const existingProfile = await prisma.freelancerProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (existingProfile) {
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
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.log("CREATE PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        freelancerProfile: true,
      },
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("GET PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
