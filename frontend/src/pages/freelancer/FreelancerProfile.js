import React from "react";

import ProfileHeader from "./components/ProfileHeader";
import StatsCard from "./components/StatsCard";
import SkillsSection from "./components/SkillsSection";
import PortfolioSection from "./components/PortfolioSection";
import EditProfileModal from "./components/EditProfileModal";

function FreelancerProfile() {
  return (
    <div className="container mt-4">

      <ProfileHeader />

      <div className="row my-3">
        <StatsCard />
      </div>

      <SkillsSection />

      <PortfolioSection />

      <EditProfileModal />

    </div>
  );
}

export default FreelancerProfile;
