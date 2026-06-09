const prisma = require("../prisma/client");

// CREATE FREELANCER PROFILE
exports.createFreelancerProfile = async (req, res) => {
  try {
    const { title, bio, skills, hourlyRate, country } = req.body;

    const userId = req.user.id;

    // CHECK USER EXISTS FIRST
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await prisma.freelancerProfile.create({
      data: {
        title,
        bio,
        skills,
        hourlyRate,
        country,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      profile,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
