import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [proposalData, setProposalData] = useState({
    bidAmount: "",
    deliveryDays: "",
    coverLetter: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userRole] = useState(localStorage.getItem("userRole"));
  const { projectId } = useParams();

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalChange = (e) => {
    const { name, value } = e.target;
    setProposalData((prev) => ({ ...prev, [name]: value }));
  };

  const submitProposal = async (e) => {
    e.preventDefault();
    if (!proposalData.bidAmount || !proposalData.deliveryDays) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("/api/proposals", {
        projectId,
        ...proposalData,
      });
      alert("Proposal submitted!");
      fetchProject();
      setProposalData({ bidAmount: "", deliveryDays: "", coverLetter: "" });
    } catch (error) {
      alert("Failed: " + error.response?.data?.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!project) return <div className="p-6">Project not found</div>;

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {/* Project Details */}
      <div className="col-span-2">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-600">{project.category}</p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">{project.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="text-2xl font-bold text-green-600">₹{project.budget}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deadline</p>
              <p className="font-semibold">{new Date(project.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Proposals</p>
              <p className="font-semibold">{project.proposals.length}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">Client</h3>
            <div className="flex items-center gap-4">
              {project.client.avatarUrl && (
                <img src={project.client.avatarUrl} alt="" className="w-16 h-16 rounded-full object-cover" />
              )}
              <div>
                <p className="font-semibold">{project.client.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Submission */}
      {userRole === "freelancer" && (
        <div className="col-span-1">
          <form onSubmit={submitProposal} className="bg-white rounded-lg p-6 border border-gray-200 sticky top-6 space-y-4">
            <h2 className="text-xl font-bold">Submit Proposal</h2>

            <div>
              <label className="block text-sm font-semibold mb-2">Bid Amount (₹)</label>
              <input
                type="number"
                name="bidAmount"
                value={proposalData.bidAmount}
                onChange={handleProposalChange}
                placeholder="5000"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Delivery Days</label>
              <input
                type="number"
                name="deliveryDays"
                value={proposalData.deliveryDays}
                onChange={handleProposalChange}
                placeholder="7"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={proposalData.coverLetter}
                onChange={handleProposalChange}
                placeholder="Why are you the best fit for this project?"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Proposal"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}