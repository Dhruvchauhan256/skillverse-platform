const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const auth = require("../middleware/auth");

const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create payment order
router.post("/create-order", auth, async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { proposal: true },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.amount * 100), // Convert to paise
      currency: "INR",
      receipt: `order_${orderId}`,
      notes: {
        orderId: orderId,
        projectId: order.projectId,
        freelancerId: order.freelancerId,
      },
    });

    res.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post("/verify-payment", auth, async (req, res) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Verify signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Update order payment status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "released",
        amountHeld: 0,
        amountReleased: (await prisma.order.findUnique({ where: { id: orderId } }))
          ?.amountHeld || 0,
      },
    });

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order details
router.get("/:orderId", async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId },
      include: {
        proposal: { include: { project: true } },
        milestones: true,
      },
    });

    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit milestone
router.post("/:orderId/milestone/:milestoneId/submit", auth, async (req, res) => {
  try {
    const { orderId, milestoneId } = req.params;
    const { deliverables } = req.body;

    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        status: "submitted",
        submittedAt: new Date(),
      },
    });

    res.json(milestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve milestone (release funds)
router.post("/:orderId/milestone/:milestoneId/approve", auth, async (req, res) => {
  try {
    const { orderId, milestoneId } = req.params;

    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        status: "released",
        approvedAt: new Date(),
      },
    });

    // Check if all milestones are completed
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { milestones: true },
    });

    const allComplete = order.milestones.every((m) => m.status === "released");

    if (allComplete) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "completed", paymentStatus: "released" },
      });
    }

    res.json(milestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;