const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

// routes
const authRouter = require("./routes/auth");
const avatarRouter = require("./routes/avatar");
const chatRouter = require("./routes/chat");
const freelancerRouter = require("./routes/freelancers");

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// ✅ Socket setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

// ---------------- ROUTES ----------------
app.use("/api/auth", authRouter);
app.use("/api/avatar", avatarRouter);
app.use("/api/chats", chatRouter);
app.use("/api/freelancers", freelancerRouter);

// ---------------- ACTIVE USERS ----------------
const activeUsers = new Map();

// ---------------- SOCKET.IO ----------------
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // user join
  socket.on("user-join", (userId) => {
    if (!userId) return;
    activeUsers.set(userId, socket.id);
    socket.userId = userId;
  });

  // send message
  socket.on("send-message", async (data) => {
    try {
      const { chatId, senderId, receiverId, content } = data;

      if (!chatId || !senderId || !receiverId || !content) return;

      const message = await prisma.message.create({
        data: {
          content,
          chatId,
          senderId,
          receiverId,
        },
      });

      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: { name: true, avatarUrl: true },
      });

      const messageData = {
        id: message.id,
        content: message.content,
        senderId,
        senderName: sender?.name || "Unknown",
        senderAvatar: sender?.avatarUrl || null,
        timestamp: message.createdAt,
      };

      const receiverSocketId = activeUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message-received", messageData);
      }

      socket.emit("message-sent", messageData);
    } catch (error) {
      console.error("Socket message error:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  // typing
  socket.on("typing", (data) => {
    const receiverSocketId = activeUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-typing", { isTyping: true });
    }
  });

  socket.on("stop-typing", (data) => {
    const receiverSocketId = activeUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user-typing", { isTyping: false });
    }
  });

  // disconnect
  socket.on("disconnect", () => {
    if (socket.userId) {
      activeUsers.delete(socket.userId);
    }
    console.log("User disconnected:", socket.id);
  });
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});