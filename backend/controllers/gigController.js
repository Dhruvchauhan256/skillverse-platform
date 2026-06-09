const prisma = require("../prisma/client");

exports.createGig = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
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
      message: error.message,
    });
  }
};
