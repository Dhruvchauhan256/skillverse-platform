import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ REQUIRED IMPORTS (this was missing)
import ConversationList from "../../components/chat/ConversationList";
import ChatWindow from "../../components/chat/ChatWindow";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchConversations();
  }, []);

  // ✅ Get conversations
  const fetchConversations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/messages/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const users = res.data.conversations.map((msg) =>
        msg.senderId === msg.receiver?.id ? msg.sender : msg.receiver
      );

      setConversations(users);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Get messages of selected user
  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Send message
  const sendMessage = async (content) => {
    if (!selectedUser) return;

    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        {
          receiverId: selectedUser.id,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMessages(selectedUser.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        {/* LEFT: Conversations */}
        <div className="col-md-4">
          <ConversationList
            conversations={conversations}
            selectedUser={selectedUser}
            setSelectedUser={(user) => {
              setSelectedUser(user);
              fetchMessages(user.id);
            }}
          />
        </div>

        {/* RIGHT: Chat */}
        <div className="col-md-8">
          <ChatWindow
            messages={messages}
            sendMessage={sendMessage}
          />
        </div>

      </div>
    </div>
  );
}

export default Messages;
