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
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE FREELANCER PROFILE
exports.updateFreelancerProfile = async (req, res) => {
  try {
    const {
      title,
      bio,
      skills,
      hourlyRate,
      country,
    } = req.body;

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