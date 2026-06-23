import React, { useState, useRef } from "react";
import axios from "axios";

export default function AvatarUpload({ userId, currentAvatar, onAvatarUpdate }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post("/api/avatar/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onAvatarUpdate(response.data.avatarUrl);
      setPreview(null);
      alert("Avatar uploaded!");
    } catch (error) {
      alert("Upload failed: " + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        {preview || currentAvatar ? (
          <img
            src={preview || currentAvatar}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Avatar</span>
          </div>
        )}
      </div>

      <button
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Avatar"}
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}