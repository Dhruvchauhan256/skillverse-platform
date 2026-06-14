import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";

function EditProfileModal({ profile, setProfile, onClose }) {
  const [form, setForm] = useState(profile);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: form.name,
        title: form.title,
        bio: form.bio,
        hourly_rate: form.hourly_rate,
      })
      .eq("id", profile.id)
      .select();

    if (!error) {
      setProfile(data[0]);
      onClose();
    }
  };

  return (
    <div className="card p-4 mt-3 border-primary">
      <h5>Edit Profile</h5>

      <input name="name" value={form.name} onChange={handleChange} className="form-control mb-2" />
      <input name="title" value={form.title} onChange={handleChange} className="form-control mb-2" />
      <input name="hourly_rate" value={form.hourly_rate} onChange={handleChange} className="form-control mb-2" />
      <textarea name="bio" value={form.bio} onChange={handleChange} className="form-control mb-2" />

      <button className="btn btn-success me-2" onClick={saveProfile}>
        Save
      </button>

      <button className="btn btn-secondary" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default EditProfileModal;
