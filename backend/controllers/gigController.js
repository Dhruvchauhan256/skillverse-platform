const prisma = require("../prisma/client");

// Create Gig
exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const gig = await prisma.gig.create({
      data: {
        title,
        description,
        price,
        category,
        freelancerId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      gig,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Gigs
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await prisma.gig.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      gigs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};