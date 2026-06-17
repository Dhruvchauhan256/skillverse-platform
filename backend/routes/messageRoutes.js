const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  sendMessage,
  getMessages,
  getConversations,
  getUnreadCount,
} = require("../controllers/messageController");

router.post("/", protect, sendMessage);

router.get("/conversations", protect, getConversations);

// NEW — unread count for notification bell
router.get("/unread/count", protect, getUnreadCount);

router.get("/:userId", protect, getMessages);

module.exports = router;
