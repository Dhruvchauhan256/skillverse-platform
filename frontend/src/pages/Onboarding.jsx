import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Onboarding.css";

export default function Onboarding() {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleComplete = () => {
    const redirectUrl =
      user?.role === "freelancer" ? "/dashboard" : "/client-dashboard";
    navigate(redirectUrl);
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        {/* Progress Bar */}
        <div className="progress-section mb-4">
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">Step {step} of 3</p>
        </div>

        {/* Content */}
        {step === 1 && (
          <div className="onboarding-content">
            <h2>Welcome to SkillVerse!</h2>
            <p>Let's get you set up.</p>
            <div className="info-box">
              <p>✓ Upload your profile picture</p>
              <p>✓ Complete your profile</p>
              <p>✓ Start earning/hiring</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-content">
            <h2>Complete Your Profile</h2>
            <p>Add more details to attract {user?.role === "freelancer" ? "clients" : "freelancers"}</p>
            <div className="info-box">
              <p>• Professional summary</p>
              <p>• Skills & experience</p>
              <p>• Profile picture</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-content">
            <h2>Ready to Get Started!</h2>
            <p>You're all set!</p>
            <div className="info-box">
              {user?.role === "freelancer" ? (
                <>
                  <p>✓ Browse projects</p>
                  <p>✓ Submit proposals</p>
                  <p>✓ Get hired & earn</p>
                </>
              ) : (
                <>
                  <p>✓ Post projects</p>
                  <p>✓ Hire freelancers</p>
                  <p>✓ Manage work</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="button-group mt-5">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="btn btn-outline-primary"
            >
              Back
            </button>
          )}

          <button
            onClick={step === 3 ? handleComplete : handleNext}
            className="btn btn-primary ms-2"
            disabled={loading}
          >
            {step === 3 ? "Go to Dashboard" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}