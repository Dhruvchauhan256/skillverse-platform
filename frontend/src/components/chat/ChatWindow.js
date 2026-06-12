import React, { useState } from "react";

function ChatWindow({
  messages,
  sendMessage,
}) {
  const [content, setContent] =
    useState("");

  const handleSend = () => {
    if (!content.trim()) return;

    sendMessage(content);

    setContent("");
  };

  return (
    <div className="p-3">
      <h5>Chat</h5>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="mb-2"
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Type message..."
        />

        <button
          className="btn btn-primary ms-2"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;