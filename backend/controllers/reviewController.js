const prisma = require("../prisma/client");
const { logError } = require("../utils/logger");

// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const { projectId, toUserId, rating, title, description, isAnonymous } =
      req.body;

    if (!projectId || !toUserId || !rating) {
      return res.status(400).json({
        success: false,
        message: "projectId, toUserId, and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check if project exists and user is part of it
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Only client or accepted freelancer can review
    const proposal = await prisma.proposal.findFirst({
      where: {
        projectId,
        freelancerId: toUserId,
        status: "accepted",
      },
    });

    const isClient = project.clientId === req.user.id;
    const isFreelancer = proposal && proposal.freelancerId === req.user.id;

    if (!isClient && !isFreelancer) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to review this project",
      });
    }

    // Check if review already exists
    const existingReview = await prisma.review.findUnique({
      where: {
        projectId_fromUserId: {
          projectId,
          fromUserId: req.user.id,
        },
      },
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this project",
      });
    }

    const review = await prisma.review.create({
      data: {
        projectId,
        fromUserId: req.user.id,
        toUserId,
        rating,
        title,
        description,
        isAnonymous: isAnonymous || false,
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    logError("CREATE REVIEW", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET REVIEWS FOR A USER
exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        toUserId: userId,
      },
      include: {
        fromUser: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate average rating
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
            1
          )
        : 0;

    res.status(200).json({
      success: true,
      reviews,
      averageRating: avgRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    logError("GET USER REVIEWS", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET REVIEWS FOR A PROJECT
exports.getProjectReviews = async (req, res) => {
  try {
    const { projectId } = req.params;

    const reviews = await prisma.review.findMany({
      where: {
        projectId,
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    logError("GET PROJECT REVIEWS", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE REVIEW
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, description } = req.body;

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only review creator can update
    if (review.fromUserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this review",
      });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        rating: rating || review.rating,
        title: title || review.title,
        description: description || review.description,
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    logError("UPDATE REVIEW", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Only review creator can delete
    if (review.fromUserId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review",
      });
    }

    await prisma.review.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    logError("DELETE REVIEW", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET MY REVIEWS GIVEN
exports.getMyReviewsGiven = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        fromUserId: req.user.id,
      },
      include: {
        toUser: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    logError("GET MY REVIEWS GIVEN", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};