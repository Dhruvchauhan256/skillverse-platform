import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";
import StarRating from "../../../components/common/StarRating";

function EditProfileModal({ profile, setProfile, onClose }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    name: profile?.name || loggedInUser?.name || "",
    title: profile?.title || "",
    bio: profile?.bio || "",
    hourly_rate: profile?.hourly_rate || 0,
    location: profile?.location || "",
    skills: profile?.skills || [],
    avatarFile: null,
    portfolio: profile?.portfolio || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "hourly_rate" ? Number(value) : value,
    });
  };

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({
        ...form,
        skills: [...form.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill),
    });
  };

  const uploadAvatar = async (file) => {
    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (error) {
        setError("Avatar upload failed");
        return null;
      }

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err) {
      setError("Upload error");
      return null;
    }
  };

  const saveProfile = async () => {
    if (!loggedInUser?.id) {
      setError("User not found");
      return;
    }

    if (!form.name || !form.title || !form.bio) {
      setError("Name, title, and bio are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let avatarUrl = profile?.avatar_url;

      if (form.avatarFile) {
        avatarUrl = await uploadAvatar(form.avatarFile);
        if (!avatarUrl) return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: loggedInUser.id,
            name: form.name,
            title: form.title,
            bio: form.bio,
            hourly_rate: form.hourly_rate,
            location: form.location,
            avatar_url: avatarUrl,
            skills: form.skills,
            portfolio: form.portfolio,
            updated_at: new Date(),
          },
          { onConflict: "user_id" }
        )
        .select();

      if (error) {
        setError("Failed to save profile: " + error.message);
        return;
      }

      setProfile(data[0]);
      onClose();
    } catch (err) {
      console.log(err);
      setError("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletion = () => {
    const fields = [
      form.name,
      form.title,
      form.bio,
      form.hourly_rate,
      form.location,
      form.avatarFile || profile?.avatar_url,
      form.skills?.length,
      form.portfolio?.length,
    ];

    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "24px",
          borderRadius: "12px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="fw-bold mb-3">
          {profile ? "Edit Your Profile" : "Create Your Freelancer Profile"}
        </h3>

        {error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}

        {/* NAME */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Your full name"
          />
        </div>

        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Professional Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g., React Developer, UI Designer"
          />
        </div>

        {/* BIO */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Bio *</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Tell clients about yourself, experience, and what you offer"
          />
        </div>

        {/* HOURLY RATE */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Hourly Rate (₹)</label>
          <input
            type="number"
            name="hourly_rate"
            value={form.hourly_rate}
            onChange={handleChange}
            className="form-control"
            placeholder="500"
            min="0"
          />
        </div>

        {/* LOCATION */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="form-control"
            placeholder="City, Country"
          />
        </div>

        {/* AVATAR */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, avatarFile: e.target.files[0] })
            }
            className="form-control"
          />
          {form.avatarFile && (
            <small className="text-success">✓ Image selected</small>
          )}
        </div>

        {/* SKILLS */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Skills</label>
          <div className="input-group mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              className="form-control"
              placeholder="e.g., React, Node.js, MongoDB"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={addSkill}
            >
              Add
            </button>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {form.skills.map((skill, i) => (
              <span key={i} className="badge bg-primary">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    marginLeft: "6px",
                    padding: "0",
                  }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* PORTFOLIO */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Portfolio (Optional)</label>
          <small className="text-muted d-block mb-2">
            Add links to your best projects
          </small>
          {form.portfolio.map((item, i) => (
            <div key={i} className="mb-2">
              <input
                type="text"
                placeholder="Project title"
                value={item.title || ""}
                onChange={(e) => {
                  const updated = [...form.portfolio];
                  updated[i].title = e.target.value;
                  setForm({ ...form, portfolio: updated });
                }}
                className="form-control mb-1"
              />
              <input
                type="url"
                placeholder="Project URL"
                value={item.link || ""}
                onChange={(e) => {
                  const updated = [...form.portfolio];
                  updated[i].link = e.target.value;
                  setForm({ ...form, portfolio: updated });
                }}
                className="form-control"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() =>
              setForm({
                ...form,
                portfolio: [...form.portfolio, { title: "", link: "" }],
              })
            }
          >
            + Add Portfolio Item
          </button>
        </div>

        {/* COMPLETION */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Profile Completion</label>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${calculateCompletion()}%` }}
            />
          </div>
          <small className="text-muted">{calculateCompletion()}% complete</small>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-success flex-grow-1"
            onClick={saveProfile}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;