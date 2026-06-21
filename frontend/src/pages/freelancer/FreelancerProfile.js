import React, { useEffect, useState, useCallback } from "react";
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
  const [error, setError] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");
  const isPublicView = !!name;

  const fetchPublicProfile = useCallback(async (profileName) => {
    try {
      setLoading(true);
      setError("");
      const { data, error: supabaseError } = await supabase
        .from("profiles")
        .select("*")
        .ilike("name", profileName)
        .single();
      if (supabaseError) {
        console.log("Profile fetch error:", supabaseError);
        setProfile(null);
        setError("Profile not found");
        return;
      }
      if (!data) {
        setProfile(null);
        setError("No profile found");
        return;
      }
      setProfile(data);
    } catch (err) {
      console.error("Fetch public profile error:", err);
      setProfile(null);
      setError("Error loading profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyProfile = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError("");
      const { data, error: supabaseError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (supabaseError) {
        console.log("My profile fetch error:", supabaseError);
        setProfile(null);
        return;
      }
      if (!data) {
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
      console.error("Fetch my profile error:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPublicView && name) {
      fetchPublicProfile(name);
    } else if (!isPublicView && loggedInUser?.id) {
      fetchMyProfile(loggedInUser.id);
    } else {
      setLoading(false);
    }
  }, [name, isPublicView, loggedInUser?.id, fetchPublicProfile, fetchMyProfile]);

  const profileCompletion = () => {
    if (!profile) return 0;
    const fields = [
      profile.name,
      profile.title,
      profile.bio,
      profile.location,
      profile.hourly_rate > 0,
      profile.skills?.length > 0,
      profile.portfolio?.length > 0,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  const handleLeaveReview = (projectId) => {
    setCompletedProject(projectId);
    setReviewModalOpen(true);
  };

  const handleReviewClose = () => {
    setReviewModalOpen(false);
    setCompletedProject(null);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile && isPublicView) {
    return (
      <div className="container mt-5">
        <div className="card p-4 text-center">
          <h4 className="mb-3">❌ Profile Not Found</h4>
          <p className="text-muted mb-3">This freelancer profile does not exist or has been removed.</p>
          <a href="/find-talent" className="btn btn-primary">← Back to Find Talent</a>
        </div>
      </div>
    );
  }

  if (!profile && !isPublicView) {
    return (
      <div className="container mt-5">
        <div className="card p-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-2">🚀 Create Your Freelancer Profile</h3>
            <p className="text-muted">Get discovered by clients and start earning on SkillVerse</p>
          </div>
          <div className="alert alert-info mb-4">
            <strong>Why create a profile?</strong>
            <ul className="mb-0 mt-2">
              <li>✓ Appear in search results for clients</li>
              <li>✓ Showcase your skills and portfolio</li>
              <li>✓ Build your reputation with reviews</li>
              <li>✓ Increase your chances of getting hired</li>
            </ul>
          </div>
          <div className="text-center">
            {!editOpen ? (
              <button className="btn btn-success btn-lg" onClick={() => setEditOpen(true)}>
                ✨ Create Profile Now
              </button>
            ) : (
              <EditProfileModal profile={null} setProfile={setProfile} onClose={() => setEditOpen(false)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {error && <div className="alert alert-warning mb-3">{error}</div>}
      <ProfileHeader profile={profile} onEdit={!isPublicView ? () => setEditOpen(true) : null} />
      <div className="mt-3 mb-3">
        <RankingBadge score={profile?.ranking_score || 0} />
      </div>
      <StatsCard profile={profile} />
      {!isPublicView && (
        <div className="card p-3 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="fw-bold mb-0">Profile Completion</h6>
            <span className="fw-bold text-success">{profileCompletion()}%</span>
          </div>
          <div className="progress" style={{ height: "8px" }}>
            <div className="progress-bar bg-success" style={{ width: `${profileCompletion()}%` }} />
          </div>
          <small className="text-muted mt-2 d-block">Complete your profile to attract more clients</small>
        </div>
      )}
      <SkillsSection profile={profile} />
      <ReviewDisplay userId={profile?.user_id || loggedInUser?.id} />
      <div className="card p-3 mb-3">
        <h5 className="fw-bold mb-3">📁 Portfolio</h5>
        {profile?.portfolio && profile.portfolio.length > 0 ? (
          <div className="row g-3">
            {profile.portfolio.map((item, i) => (
              <div key={i} className="col-md-6">
                <div className="card h-100 p-3 border">
                  <h6 className="fw-bold mb-2">{typeof item === "object" ? item.title : item}</h6>
                  {typeof item === "object" && item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                      🔗 View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-4">
            📭 No portfolio items added yet
            {!isPublicView && (
              <>
                <br />
                <small>Add your best projects to showcase your work!</small>
              </>
            )}
          </p>
        )}
      </div>
      {isPublicView && loggedInUser?.role === "client" && (
        <div className="card p-3 mb-3">
          <button className="btn btn-success btn-lg w-100 fw-bold" onClick={() => handleLeaveReview(profile?.id)}>
            ⭐ Leave a Review for This Freelancer
          </button>
          <small className="text-muted d-block mt-2 text-center">Share your experience working with this freelancer</small>
        </div>
      )}
      {!isPublicView && editOpen && (
        <EditProfileModal profile={profile} setProfile={setProfile} onClose={() => setEditOpen(false)} />
      )}
      {reviewModalOpen && completedProject && (
        <ReviewModal projectId={completedProject} toUserId={profile?.user_id} onClose={handleReviewClose} onSuccess={() => {
          setReviewModalOpen(false);
          setCompletedProject(null);
        }} />
      )}
    </div>
  );
}

export default FreelancerProfile;
