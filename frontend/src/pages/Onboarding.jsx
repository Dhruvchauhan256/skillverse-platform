import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AvatarUpload from "../components/AvatarUpload";

export default function Onboarding() {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: "",
    hourlyRate: "",
  });
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleComplete = () => {
    // Save profile and redirect to dashboard
    const redirectUrl = user.role === "freelancer" ? "/dashboard/freelancer" : "/dashboard/client";
    navigate(redirectUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-16 h-1 rounded ${
                  s <= step ? "bg-blue-500" : "bg-white/20"
                }`}
              ></div>
            ))}
          </div>
          <p className="text-white/70 text-sm">Step {step} of 3</p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Upload Your Avatar
              </h2>
              <p className="text-blue-200/70 mb-6">
                A profile picture helps build trust with clients/freelancers
              </p>
              <AvatarUpload
                userId={user?.id}
                onAvatarUpdate={setAvatar}
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Complete Your Profile
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-100 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder={
                      user?.role === "freelancer"
                        ? "Describe your skills and experience..."
                        : "Tell us about your company..."
                    }
                    rows="4"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {user?.role === "freelancer" && (
                  <div>
                    <label className="block text-blue-100 mb-2">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) =>
                        setFormData({ ...formData, hourlyRate: e.target.value })
                      }
                      placeholder="500"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started!
              </h2>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-white font-bold mb-3">Next Steps:</h3>
                <ul className="text-blue-200 space-y-2">
                  {user?.role === "freelancer" ? (
                    <>
                      <li>✓ Browse available projects</li>
                      <li>✓ Submit proposals for projects you're interested in</li>
                      <li>✓ Chat with clients in real-time</li>
                      <li>✓ Get paid through secure escrow</li>
                    </>
                  ) : (
                    <>
                      <li>✓ Post your first project</li>
                      <li>✓ Review freelancer proposals</li>
                      <li>✓ Hire and manage your team</li>
                      <li>✓ Make secure payments with escrow</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-blue-400 text-blue-300 rounded-lg hover:bg-blue-500/10 transition"
              >
                Back
              </button>
            )}

            <button
              onClick={step === 3 ? handleComplete : handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
            >
              {step === 3 ? "Go to Dashboard" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}