import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import ProfileHeader from "./components/ProfileHeader";
import StatsCard from "./components/StatsCard";
import RankingBadge from "./components/RankingBadge";
import EditProfileModal from "./components/EditProfileModal";
import SkillsSection from "./components/SkillsSection";
import ReviewDisplay from "../../components/common/ReviewDisplay";
import ReviewModal from "../../components/common/ReviewModal";
import { calculateRanking } from "../../utils/calculateRanking";

function FreelancerProfile() {
  const { name } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [completedProject, setCompletedProject] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const isPublicView = !!name;

  useEffect(() => {
    if (isPublicView) {
      fetchPublicProfile(name);
    } else if (loggedInUser?.id) {
      fetchMyProfile(loggedInUser.id);
    } else {
      setLoading(false);
    }
  }, [name, loggedInUser?.id, isPublicView]);

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

  // ---- OPEN REVIEW MODAL ----
  const handleLeaveReview = (projectId) => {
    setCompletedProject(projectId);
    setReviewModalOpen(true);
  };

  // ---- CLOSE REVIEW MODAL ----
  const handleReviewClose = () => {
    setReviewModalOpen(false);
    setCompletedProject(null);
  };

  if (loading) return <h3 className="p-4">Loading...</h3>;

  // PUBLIC VIEW + NO PROFILE = genuinely doesn't exist
  if (!profile && isPublicView) {
    return (
      <div className="container mt-4">
        <h4>No profile found</h4>
        <p>This freelancer profile does not exist.</p>
      </div>
    );
  }

  // OWN VIEW + NO PROFILE = let them create one now
  if (!profile && !isPublicView) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">
          <h4>Set up your freelancer profile</h4>
          <p>
            You haven't created your public profile yet. Create it now to start
            getting discovered by clients 🚀
          </p>
        </div>

        {!editOpen ? (
          <button
            className="btn btn-primary"
            onClick={() => setEditOpen(true)}
          >
            Create Profile Now
          </button>
        ) : (
          <EditProfileModal
            profile={null}
            setProfile={setProfile}
            onClose={() => setEditOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">

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

      {/* SKILLS */}
      <SkillsSection profile={profile} />

      {/* REVIEWS SECTION — SHOW ON ALL PROFILES */}
      <ReviewDisplay userId={profile?.user_id || loggedInUser?.id} />

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

      {/* LEAVE REVIEW BUTTON — only for clients viewing freelancer profile */}
      {isPublicView && loggedInUser?.role === "client" && (
        <div className="card p-3 mb-3">
          <button
            className="btn btn-success w-100"
            onClick={() => handleLeaveReview(profile?.id)}
          >
            Leave a Review for This Freelancer ⭐
          </button>
        </div>
      )}

      {/* EDIT MODAL — only on own profile */}
      {!isPublicView && editOpen && (
        <EditProfileModal
          profile={profile}
          setProfile={setProfile}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* REVIEW MODAL */}
      {reviewModalOpen && completedProject && (
        <ReviewModal
          projectId={completedProject}
          toUserId={profile?.user_id}
          onClose={handleReviewClose}
          onSuccess={() => {
            // Refresh reviews after submission
            setReviewModalOpen(false);
            setCompletedProject(null);
          }}
        />
      )}
    </div>
  );
}

export default FreelancerProfile;