const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());

// Active users tracking
const activeUsers = new Map();

// Routes
const avatarRouter = require("./routes/avatar");
const chatRouter = require("./routes/chat");

app.use("/api/avatar", avatarRouter);
app.use("/api/chats", chatRouter);
app.use("/api/auth", authRouter);

// Socket.io
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins
  socket.on("user-join", (userId) => {
    activeUsers.set(userId, socket.id);
    socket.userId = userId;
  });

  // Send message
  socket.on("send-message", async (data) => {
    const { chatId, senderId, receiverId, content } = data;

    try {
      const message = await prisma.message.create({
        data: { content, chatId, senderId, receiverId },
      });

      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: { name: true, avatarUrl: true },
      });

      const messageData = {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        senderName: sender.name,
        senderAvatar: sender.avatarUrl,
        timestamp: message.createdAt,
      };

      const receiverSocketId = activeUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("message-received", messageData);
      }

      socket.emit("message-sent", messageData);
    } catch (error) {
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  // Typing
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

  // Disconnect
  socket.on("disconnect", () => {
    if (socket.userId) {
      activeUsers.delete(socket.userId);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server on ${PORT}`));