import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import ProfileHeader from "./components/ProfileHeader";
import StatsCard from "./components/StatsCard";
import RankingBadge from "./components/RankingBadge";
import EditProfileModal from "./components/EditProfileModal";
import SkillsSection from "./components/SkillsSection";
import { calculateRanking } from "../../utils/calculateRanking";

function FreelancerProfile() {
  const { name } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  // If :name param exists = public profile view
  // If no :name param = logged in user's own profile
  const isPublicView = !!name;

  useEffect(() => {
    if (isPublicView) {
      fetchPublicProfile(name);
    } else if (loggedInUser?.id) {
      fetchMyProfile(loggedInUser.id);
    } else {
      setLoading(false);
    }
  }, [name, loggedInUser?.id]);

  // ---- FETCH PUBLIC PROFILE BY NAME ----
  const fetchPublicProfile = async (profileName) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .ilike("name", profileName)
        .single();

      if (error || !data) {
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---- FETCH MY OWN PROFILE ----
  const fetchMyProfile = async (userId) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        setProfile(null);
        return;
      }

      const score = calculateRanking(data);

      if (data.ranking_score !== score) {
        await supabase
          .from("profiles")
          .update({ ranking_score: score })
          .eq("id", data.id);

        data.ranking_score = score;
      }

      setProfile(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) return <h3 className="p-4">Loading...</h3>;

  if (!profile) {
    return (
      <div className="container mt-4">
        <h4>No profile found</h4>
        <p>
          {isPublicView
            ? "This freelancer profile does not exist."
            : "Create your freelancer profile to start earning 🚀"}
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <ProfileHeader
        profile={profile}
        onEdit={!isPublicView ? () => setEditOpen(true) : null}
      />

      {/* RANK BADGE */}
      <div className="mt-3">
        <RankingBadge score={profile?.ranking_score || 0} />
      </div>

      {/* STATS */}
      <StatsCard profile={profile} />

      {/* PROFILE COMPLETION — only show on own profile */}
      {!isPublicView && (
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
      )}

      {/* SKILLS — now using SkillsSection component */}
      <SkillsSection profile={profile} />

      {/* PORTFOLIO */}
      <div className="card p-3 mb-3">
        <h5>Portfolio</h5>
        {profile?.portfolio?.length ? (
          <ul>
            {profile.portfolio.map((item, i) => (
              <li key={i}>
                {typeof item === "object" ? (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No portfolio added</p>
        )}
      </div>

      {/* EDIT MODAL — only on own profile */}
      {!isPublicView && editOpen && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          onClose={() => setEditOpen(false)}
          refreshProfile={() => fetchMyProfile(loggedInUser.id)}
        />
      )}

    </div>
  );
}

export default FreelancerProfile;
