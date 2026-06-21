import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";

function EditProfileModal({ profile, setProfile, onClose }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    name: profile?.name || loggedInUser?.name || "",
    title: profile?.title || "",
    bio: profile?.bio || "",
    hourly_rate: profile?.hourly_rate || 0,
    location: profile?.location || "",
    skills: profile?.skills || [],
    portfolio: profile?.portfolio || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      setSuccess("");

      const { data, error: supabaseError } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: loggedInUser.id,
            name: form.name,
            title: form.title,
            bio: form.bio,
            hourly_rate: form.hourly_rate,
            location: form.location,
            skills: form.skills,
            portfolio: form.portfolio,
            updated_at: new Date(),
          },
          { onConflict: "user_id" }
        )
        .select();

      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        setError("Failed to save profile: " + supabaseError.message);
        return;
      }

      if (data && data.length > 0) {
        setProfile(data[0]);
        setSuccess("✅ Profile saved successfully!");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletion = () => {
    const fields = [
      form.name,
      form.title,
      form.bio,
      form.hourly_rate > 0,
      form.location,
      form.skills?.length > 0,
      form.portfolio?.length > 0,
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
          {profile ? "✏️ Edit Your Profile" : "🚀 Create Your Freelancer Profile"}
        </h3>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show mb-3">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            />
          </div>
        )}

        {success && (
          <div className="alert alert-success alert-dismissible fade show mb-3">
            {success}
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess("")}
            />
          </div>
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
            placeholder="e.g., React Developer, UI Designer, Content Writer"
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
            rows="4"
            placeholder="Tell clients about yourself, your experience, expertise, and what you offer. Be honest and detailed!"
          />
          <small className="text-muted">
            {form.bio.length}/500 characters
          </small>
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
          <small className="text-muted">
            Typical rates: ₹300-₹1000+ depending on experience
          </small>
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
            placeholder="e.g., Bangalore, India"
          />
        </div>

        {/* AVATAR NOTICE */}
        <div
          className="mb-3 p-3 bg-info bg-opacity-10 border border-info rounded-3"
          style={{ borderLeft: "4px solid #0dcaf0" }}
        >
          <small className="text-info fw-semibold">
            💡 Profile Avatar: Your initials will be shown until avatar upload is enabled.
          </small>
        </div>

        {/* SKILLS */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Skills *</label>
          <div className="input-group mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
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

          <div className="d-flex flex-wrap gap-2 mb-2">
            {form.skills.length === 0 ? (
              <small className="text-muted">No skills added yet</small>
            ) : (
              form.skills.map((skill, i) => (
                <span key={i} className="badge bg-success">
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
                      fontSize: "16px",
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        {/* PORTFOLIO */}
        <div className="mb-3">
          <label className="form-label fw-semibold">
            Portfolio (Optional)
          </label>
          <small className="text-muted d-block mb-2">
            Add links to your best projects/work samples
          </small>

          {form.portfolio.map((item, i) => (
            <div key={i} className="mb-2 p-2 bg-light rounded">
              <input
                type="text"
                placeholder="Project title"
                value={item.title || ""}
                onChange={(e) => {
                  const updated = [...form.portfolio];
                  updated[i].title = e.target.value;
                  setForm({ ...form, portfolio: updated });
                }}
                className="form-control mb-2"
              />
              <div className="input-group">
                <input
                  type="url"
                  placeholder="Project URL (https://example.com)"
                  value={item.link || ""}
                  onChange={(e) => {
                    const updated = [...form.portfolio];
                    updated[i].link = e.target.value;
                    setForm({ ...form, portfolio: updated });
                  }}
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    const updated = form.portfolio.filter((_, idx) => idx !== i);
                    setForm({ ...form, portfolio: updated });
                  }}
                >
                  Remove
                </button>
              </div>
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
            ➕ Add Portfolio Item
          </button>
        </div>

        {/* COMPLETION BAR */}
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <label className="form-label fw-semibold mb-0">
              Profile Completion
            </label>
            <span className="fw-bold text-success">{calculateCompletion()}%</span>
          </div>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${calculateCompletion()}%` }}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-success flex-grow-1 fw-bold"
            onClick={saveProfile}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Saving...
              </>
            ) : (
              "💾 Save Profile"
            )}
          </button>
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;