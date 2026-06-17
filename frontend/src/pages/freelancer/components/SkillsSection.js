import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

function SkillsSection({ profile }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(!profile);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    // If profile is passed as prop, use it directly
    if (profile) {
      setSkills(profile.skills || []);
      setLoading(false);
      return;
    }

    // Otherwise fetch own profile from Supabase
    if (user?.id) {
      fetchOwnSkills();
    } else {
      setLoading(false);
    }
  }, [profile, user?.id]);

  const fetchOwnSkills = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("profiles")
        .select("skills")
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        setSkills([]);
        return;
      }

      setSkills(data.skills || []);
    } catch (err) {
      console.log("SKILLS FETCH ERROR:", err);
      setError("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card p-3 mb-3">
        <h5>Skills</h5>
        <div className="text-muted small">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-3 mb-3">
        <h5>Skills</h5>
        <div className="text-danger small">{error}</div>
      </div>
    );
  }

  return (
    <div className="card p-3 mb-3">
      <h5>Skills</h5>
      <div className="d-flex gap-2 flex-wrap">
        {skills.length > 0 ? (
          skills.map((skill, i) => (
            <span key={i} className="badge bg-primary">
              {skill}
            </span>
          ))
        ) : (
          <p className="text-muted mb-0">No skills added yet</p>
        )}
      </div>
    </div>
  );
}

export default SkillsSection;
