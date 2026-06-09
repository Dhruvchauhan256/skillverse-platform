const prisma = require("../prisma/client");

// CREATE GIG
exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const gig = await prisma.gig.create({
      data: {
        title,
        description,
        price: Number(price),
        category,
        freelancerId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      gig,
    });

  } catch (error) {
    console.log("GIG ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL GIGS
exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await prisma.gig.findMany();
    res.json({ success: true, gigs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
