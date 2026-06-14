import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import EditProfileModal from "./components/EditProfileModal";
import { calculateRanking } from "../../utils/calculateRanking";

function FreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  // ---------------------------
  // FETCH PROFILE
  // ---------------------------
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        console.log("Profile fetch error:", error);
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(data);

      // update ranking safely
      await updateRanking(data);

      setLoading(false);
    } catch (err) {
      console.log("Unexpected error:", err);
      setLoading(false);
    }
  };

  // ---------------------------
  // RANKING SYSTEM (UPWORK STYLE)
  // ---------------------------
  const updateRanking = async (profileData) => {
    try {
      if (!profileData) return;

      const score = calculateRanking(profileData);

      await supabase
        .from("profiles")
        .update({ ranking_score: score })
        .eq("id", profileData.id);

      setProfile((prev) =>
        prev ? { ...prev, ranking_score: score } : prev
      );
    } catch (err) {
      console.log("Ranking update error:", err);
    }
  };

  // ---------------------------
  // PROFILE COMPLETION %
  // ---------------------------
  const profileCompletion = () => {
    if (!profile) return 0;

    const fields = [
      profile.name,
      profile.title,
      profile.bio,
      profile.avatar_url,
      profile.hourly_rate,
      profile.skills?.length,
      profile.portfolio?.length,
    ];

    const filled = fields.filter(Boolean).length;

    return Math.round((filled / fields.length) * 100);
  };

  // ---------------------------
  // LOADING
  // ---------------------------
  if (loading) return <h3 className="p-4">Loading...</h3>;

  // ---------------------------
  // NO PROFILE
  // ---------------------------
  if (!profile) {
    return (
      <div className="container mt-4">
        <h4>No profile found</h4>
        <p>Create your freelancer profile to get started.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="card p-4 mb-3 d-flex flex-row justify-content-between align-items-center">

        <div className="d-flex gap-3 align-items-center">

          <img
            src={profile?.avatar_url || "https://via.placeholder.com/80"}
            className="rounded-circle"
            width="80"
            height="80"
            height="80"
            alt="avatar"
          />

          <div>
            <h4 className="mb-1">
              {profile?.name || "Unknown User"}
            </h4>

            <p className="text-muted mb-1">
              {profile?.title || "No title set"}
            </p>

            {/* ONLINE STATUS (FIXED + SAFE) */}
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: profile?.is_online ? "green" : "gray",
                  display: "inline-block"
                }}
              />
              <span>
                {profile?.is_online ? "Online" : "Offline"}
              </span>
            </div>

            <div className="mt-2">
              💰 ₹{profile?.hourly_rate || 0}/hr
            </div>

            <div className="mt-2">
              🏆 Ranking Score:{" "}
              <b>{profile?.ranking_score || 0}/100</b>
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
      <div className="row mb-3 g-2">

        <div className="col-md-3">
          <div className="card p-3 text-center">
            ⭐ {profile?.rating || 0}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            💰 ₹{profile?.earnings || 0}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            ✅ {profile?.jobs_completed || 0}
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center">
            📩 {profile?.response_rate || 0}%
          </div>
        </div>

      </div>

      {/* SKILLS */}
      <div className="card p-3 mb-3">
        <h5>Skills</h5>

        <div className="d-flex flex-wrap gap-2">
          {profile?.skills?.length > 0 ? (
            profile.skills.map((skill, i) => (
              <span key={i} className="badge bg-primary">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-muted">No skills added</p>
          )}
        </div>
      </div>

      {/* PORTFOLIO */}
      <div className="card p-3 mb-3">
        <h5>Portfolio</h5>

        {profile?.portfolio?.length > 0 ? (
          <ul>
            {profile.portfolio.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No portfolio added</p>
        )}
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          onClose={() => setEditOpen(false)}
          refreshProfile={fetchProfile}
        />
      )}

    </div>
  );
}

export default FreelancerProfile;
