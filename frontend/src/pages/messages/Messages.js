import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";

function Messages() {
  const [conversations, setConversations] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const token =
    localStorage.getItem("token");

  const fetchConversations =
    async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/conversations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users =
          res.data.conversations.map(
            (msg) =>
              msg.senderId ===
              msg.receiver?.id
                ? msg.sender
                : msg.receiver
          );

        setConversations(users);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchMessages = async (
    userId
  ) => {
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

  const sendMessage = async (
    content
  ) => {
    if (!selectedUser) return;

    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        {
          receiverId:
            selectedUser.id,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMessages(
        selectedUser.id
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">

        <div className="col-md-4">
          <ConversationList
            conversations={
              conversations
            }
            selectedUser={
              selectedUser
            }
            setSelectedUser={(
              user
            ) => {
              setSelectedUser(
                user
              );
              fetchMessages(
                user.id
              );
            }}
          />
        </div>

        <div className="col-md-8">
          <ChatWindow
            messages={messages}
            sendMessage={
              sendMessage
            }
          />
        </div>

      </div>
    </div>
  );
}

export default Messages;
