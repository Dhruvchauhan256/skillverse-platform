import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";

function EditProfileModal({ profile, setProfile, onClose }) {
  const [form, setForm] = useState({
    name: profile.name || "",
    title: profile.title || "",
    bio: profile.bio || "",
    hourly_rate: profile.hourly_rate || 0,
    avatarFile: null,
    portfolio: profile.portfolio || [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // 📌 AVATAR UPLOAD (SUPABASE STORAGE)
  // ================================
  const uploadAvatar = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.log("Avatar upload error:", error);
      return null;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ================================
  // 💾 SAVE PROFILE (WITH PORTFOLIO + AVATAR)
  // ================================
  const saveProfile = async () => {
    let avatarUrl = profile.avatar_url;

    if (form.avatarFile) {
      avatarUrl = await uploadAvatar(form.avatarFile);
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: form.name,
        title: form.title,
        bio: form.bio,
        hourly_rate: Number(form.hourly_rate),
        avatar_url: avatarUrl,

        // 📌 IMPORTANT: Portfolio save
        portfolio: form.portfolio,

        updated_at: new Date(),
      })
      .eq("id", profile.id)
      .select();

    if (error) {
      console.log("Save error:", error);
      return;
    }

    setProfile(data[0]);
    onClose();
  };

  // ================================
  // 📊 PROFILE COMPLETION (UPWORK STYLE)
  // ================================
  const calculateCompletion = () => {
    const fields = [
      form.name,
      form.title,
      form.bio,
      form.hourly_rate,
      form.avatarFile || profile.avatar_url,
      form.portfolio?.length,
    ];

    const filled = fields.filter(Boolean).length;

    return Math.round((filled / fields.length) * 100);
  };

  // ================================
  // ➕ ADD PORTFOLIO ITEM
  // ================================
  const addPortfolioItem = () => {
    setForm({
      ...form,
      portfolio: [
        ...form.portfolio,
        { title: "", link: "" },
      ],
    });
  };

  return (
    <div className="card p-4 mt-3 border-primary">

      <h4>Edit Profile</h4>

      {/* ==================== */}
      {/* 📌 BASIC FIELDS */}
      {/* ==================== */}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Name"
      />

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Title"
      />

      <textarea
        name="bio"
        value={form.bio}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Bio"
      />

      <input
        name="hourly_rate"
        type="number"
        value={form.hourly_rate}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Hourly Rate"
      />

      {/* ==================== */}
      {/* 📌 FILE INPUT (AVATAR) */}
      {/* ==================== */}

      <label className="mt-2">Upload Avatar</label>
      <input
        type="file"
        accept="image/*"
        className="form-control mb-3"
        onChange={(e) =>
          setForm({
            ...form,
            avatarFile: e.target.files[0],
          })
        }
      />

      {/* ==================== */}
      {/* 📌 PORTFOLIO UI */}
      {/* ==================== */}

      <div className="card p-3 mb-3">
        <h5>Portfolio</h5>

        <button
          type="button"
          className="btn btn-sm btn-primary mb-2"
          onClick={addPortfolioItem}
        >
          + Add Project
        </button>

        {form.portfolio.map((item, index) => (
          <div key={index} className="mb-2">

            <input
              placeholder="Project Title"
              value={item.title}
              className="form-control mb-1"
              onChange={(e) => {
                const updated = [...form.portfolio];
                updated[index].title = e.target.value;
                setForm({ ...form, portfolio: updated });
              }}
            />

            <input
              placeholder="Project Link"
              value={item.link}
              className="form-control"
              onChange={(e) => {
                const updated = [...form.portfolio];
                updated[index].link = e.target.value;
                setForm({ ...form, portfolio: updated });
              }}
            />

          </div>
        ))}
      </div>

      {/* ==================== */}
      {/* 📊 PROFILE COMPLETION */}
      {/* ==================== */}

      <div className="mb-3">
        <h6>Profile Completion</h6>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${calculateCompletion()}%` }}
          />
        </div>

        <small>
          {calculateCompletion()}% completed
        </small>
      </div>

      {/* ==================== */}
      {/* 💾 ACTION BUTTONS */}
      {/* ==================== */}

      <button
        className="btn btn-success me-2"
        onClick={saveProfile}
      >
        Save Changes
      </button>

      <button
        className="btn btn-secondary"
        onClick={onClose}
      >
        Cancel
      </button>

    </div>
  );
}

export default EditProfileModal;
