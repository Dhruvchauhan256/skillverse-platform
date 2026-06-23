import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

export default function ChatWindow({ chatId, currentUserId, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const endRef = useRef(null);

  // Initialize socket
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("user-join", currentUserId);
    });

    newSocket.on("message-received", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("user-typing", (data) => {
      setIsTyping(data.isTyping);
    });

    return () => newSocket.disconnect();
  }, [currentUserId]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chats/${chatId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    socket.emit("send-message", {
      chatId,
      senderId: currentUserId,
      receiverId: otherUser.id,
      content: newMessage,
    });

    setNewMessage("");
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socket?.emit("typing", { receiverId: otherUser.id });

    setTimeout(() => {
      socket?.emit("stop-typing", { receiverId: otherUser.id });
    }, 2000);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        {otherUser.avatarUrl && (
          <img
            src={otherUser.avatarUrl}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{otherUser.name}</p>
          {isTyping && <p className="text-sm text-gray-500">typing...</p>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-xs ${msg.senderId === currentUserId ? "flex-row-reverse" : ""}`}>
                {msg.senderAvatar && (
                  <img src={msg.senderAvatar} alt="" className="w-6 h-6 rounded-full" />
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.senderId === currentUserId ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}