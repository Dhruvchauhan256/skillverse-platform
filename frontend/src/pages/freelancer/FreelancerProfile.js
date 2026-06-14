import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import EditProfileModal from "./components/EditProfileModal";
import { calculateRanking } from "../../utils/calculateRanking";
import { supabase } from "../../supabaseClient";

function FreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!error) setProfile(data);

    setLoading(false);
  };

  const profileCompletion = () => {
    if (!profile) return 0;

    let fields = [
      profile.name,
      profile.title,
      profile.bio,
      profile.avatar_url,
      profile.hourly_rate,
      profile.skills?.length,
    ];

    let filled = fields.filter(Boolean).length;

    return Math.round((filled / fields.length) * 100);
  };

  if (loading) return <h3 className="p-4">Loading...</h3>;

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="card p-4 mb-3 d-flex flex-row justify-content-between">

        <div className="d-flex gap-3">
          <img
            src={profile.avatar_url || "https://via.placeholder.com/80"}
            className="rounded-circle"
            width="80"
          />

          <div>
            <h4>{profile.name}</h4>
            <p className="text-muted">{profile.title}</p>

            <span className={`badge ${profile.is_online ? "bg-success" : "bg-secondary"}`}>
              {profile.is_online ? "Online" : "Offline"}
            </span>

            <div className="mt-2">
              💰 ₹{profile.hourly_rate}/hr
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setEditOpen(true)}
        >
          Edit Profile
        </button>

      </div>

      {/* PROFILE COMPLETION */}
      <div className="card p-3 mb-3">
        <h6>Profile Completion</h6>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${profileCompletion()}%` }}
          />
        </div>

        <small>{profileCompletion()}% complete</small>
      </div>

      {/* STATS */}
      <div className="row mb-3">
        <div className="col-md-3 card p-3">⭐ {profile.rating}</div>
        <div className="col-md-3 card p-3">💰 ₹{profile.earnings}</div>
        <div className="col-md-3 card p-3">✅ {profile.jobs_completed}</div>
        <div className="col-md-3 card p-3">📩 {profile.response_rate}%</div>
      </div>

      {/* SKILLS */}
      <div className="card p-3 mb-3">
        <h5>Skills</h5>

        <div className="d-flex flex-wrap gap-2">
          {profile.skills?.map((skill, i) => (
            <span key={i} className="badge bg-primary">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          onClose={() => setEditOpen(false)}
        />
      )}

    </div>
  );
}

export default FreelancerProfile;
