import React from "react";

function ConversationList({
  conversations,
  selectedUser,
  setSelectedUser,
}) {
  return (
    <div className="border-end p-3">
      <h5>Conversations</h5>

      {conversations.map((user) => (
        <div
          key={user.id}
          className={`card p-2 mb-2 ${
            selectedUser?.id === user.id
              ? "bg-light"
              : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSelectedUser(user)
          }
        >
          <strong>{user.name}</strong>
          <br />
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  );
}

export default ConversationList;