const prisma = require("../prisma/client");

// GET CURRENT USER
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...userData } = user;

    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE FREELANCER PROFILE
exports.updateFreelancerProfile = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const {
      title,
      bio,
      skills,
      hourlyRate,
      country,
    } = req.body;

    // Validation
    if (
      !title ||
      !bio ||
      !skills ||
      !hourlyRate ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingProfile =
      await prisma.freelancerProfile.findUnique({
        where: {
          userId: req.user.id,
        },
      });

    let profile;

    if (existingProfile) {
      profile =
        await prisma.freelancerProfile.update({
          where: {
            userId: req.user.id,
          },
          data: {
            title,
            bio,
            skills,
            hourlyRate: Number(hourlyRate),
            country,
          },
        });
    } else {
      profile =
        await prisma.freelancerProfile.create({
          data: {
            title,
            bio,
            skills,
            hourlyRate: Number(hourlyRate),
            country,
            userId: req.user.id,
          },
        });
    }

    res.status(200).json({
      success: true,
      message: "Freelancer profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
