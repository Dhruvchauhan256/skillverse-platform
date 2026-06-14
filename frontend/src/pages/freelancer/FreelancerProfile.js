import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import ProfileHeader from "./components/ProfileHeader";
import StatsCard from "./components/StatsCard";
import RankingBadge from "./components/RankingBadge";
import EditProfileModal from "./components/EditProfileModal";
import { calculateRanking } from "../../utils/calculateRanking";

function FreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user?.id) fetchProfile();
    else setLoading(false);
  }, [user?.id]);

  // ---------------- FETCH PROFILE ----------------
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // calculate ranking ONLY if needed
      const score = calculateRanking(data);

      if (data.ranking_score !== score) {
        await supabase
          .from("profiles")
          .update({ ranking_score: score })
          .eq("id", data.id);

        data.ranking_score = score;
      }

      setProfile(data);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ---------------- PROFILE COMPLETION ----------------
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

  // ---------------- LOADING ----------------
  if (loading) return <h3 className="p-4">Loading...</h3>;

  // ---------------- EMPTY PROFILE ----------------
  if (!profile) {
    return (
      <div className="container mt-4">
        <h4>No profile found</h4>
        <p>Create your freelancer profile to start earning 🚀</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* HEADER (Upwork Style) */}
      <ProfileHeader
        profile={profile}
        onEdit={() => setEditOpen(true)}
      />

      {/* RANK BADGE */}
      <div className="mt-3">
        <RankingBadge score={profile?.ranking_score || 0} />
      </div>

      {/* STATS */}
      <StatsCard profile={profile} />

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

      {/* SKILLS */}
      <div className="card p-3 mb-3">
        <h5>Skills</h5>

        <div className="d-flex flex-wrap gap-2">
          {profile?.skills?.length ? (
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

        {profile?.portfolio?.length ? (
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
