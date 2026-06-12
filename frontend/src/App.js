import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import FindTalent from "./pages/FindTalent";
import FindWork from "./pages/FindWork";
import FreelancerDashboard from "./pages/dashboard/FreelancerDashboard";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import ClientProfile from "./pages/client/ClientProfile";
import PostProject from "./pages/projects/PostProject";
import ProjectList from "./pages/projects/ProjectList";
import SubmitProposal from "./pages/projects/SubmitProposal";
import MyProposals from "./pages/projects/MyProposals";
import ProposalManagement from "./pages/dashboard/ProposalManagement";
import Messages from "./pages/messages/Messages";
import FreelancerProfile from "./pages/freelancer/FreelancerProfile";
import FreelancerSearch from "./pages/freelancer/FreelancerSearch";
import CategorySearch from "./pages/search/CategorySearch";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobsPage from "./pages/JobsPage";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Components
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* MARKETPLACE */}
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/freelancers" element={<FreelancerSearch />} />
        <Route path="/search" element={<CategorySearch />} />
        <Route path="/jobs" element={<JobsPage />} />

        {/* FREELANCER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENT DASHBOARD */}
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENT PROFILE */}
        <Route
          path="/client-profile"
          element={
            <ProtectedRoute>
              <ClientProfile />
            </ProtectedRoute>
          }
        />

        {/* POST PROJECT */}
        <Route
          path="/post-project"
          element={
            <ProtectedRoute>
              <PostProject />
            </ProtectedRoute>
          }
        />

        {/* PROJECT LIST */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />

        {/* SUBMIT PROPOSAL */}
        <Route
          path="/proposal"
          element={
            <ProtectedRoute>
              <SubmitProposal />
            </ProtectedRoute>
          }
        />

        {/* MY PROPOSALS */}
        <Route
          path="/my-proposals"
          element={
            <ProtectedRoute>
              <MyProposals />
            </ProtectedRoute>
          }
        />

        {/* PROPOSAL MANAGEMENT */}
        <Route
          path="/proposal-management"
          element={
            <ProtectedRoute>
              <ProposalManagement />
            </ProtectedRoute>
          }
        />

        {/* MESSAGES */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* FREELANCER PROFILE */}
        <Route
          path="/freelancer/:name"
          element={<FreelancerProfile />}
        />

        <Route
          path="/freelancer-profile"
          element={<FreelancerProfile />}
        />

      </Routes>
    </>
  );
}

export default App;