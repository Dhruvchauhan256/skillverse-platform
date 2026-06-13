import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Home
import Home from "./pages/Home";

// Marketplace
import FindTalent from "./pages/FindTalent";
import FindWork from "./pages/FindWork";
import JobsPage from "./pages/JobsPage";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboards
import FreelancerDashboard from "./pages/dashboard/FreelancerDashboard";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import ProposalManagement from "./pages/dashboard/ProposalManagement";

// Client
import ClientProfile from "./pages/client/ClientProfile";

// Projects
import PostProject from "./pages/projects/PostProject";
import ProjectList from "./pages/projects/ProjectList";
import SubmitProposal from "./pages/projects/SubmitProposal";
import MyProposals from "./pages/projects/MyProposals";
import MyProjects from "./pages/projects/MyProjects";
import EditProject from "./pages/projects/EditProject";

// Messages
import Messages from "./pages/messages/Messages";

// Freelancer
import FreelancerProfile from "./pages/freelancer/FreelancerProfile";
import FreelancerSearch from "./pages/freelancer/FreelancerSearch";

// Search
import CategorySearch from "./pages/search/CategorySearch";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Marketplace */}
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/freelancers" element={<FreelancerSearch />} />
        <Route path="/search" element={<CategorySearch />} />
        <Route path="/jobs" element={<JobsPage />} />

        {/* Freelancer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Client Dashboard */}
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Client Profile */}
        <Route
          path="/client-profile"
          element={
            <ProtectedRoute>
              <ClientProfile />
            </ProtectedRoute>
          }
        />

        {/* Post Project */}
        <Route
          path="/post-project"
          element={
            <ProtectedRoute>
              <PostProject />
            </ProtectedRoute>
          }
        />

        {/* Project List */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />

        {/* Submit Proposal */}
        <Route
          path="/proposal"
          element={
            <ProtectedRoute>
              <SubmitProposal />
            </ProtectedRoute>
          }
        />

        {/* My Proposals */}
        <Route
          path="/my-proposals"
          element={
            <ProtectedRoute>
              <MyProposals />
            </ProtectedRoute>
          }
        />

        {/* Proposal Management */}
        <Route
          path="/proposal-management"
          element={
            <ProtectedRoute>
              <ProposalManagement />
            </ProtectedRoute>
          }
        />

        {/* Messages */}
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* Freelancer Profiles */}
        <Route
          path="/freelancer/:name"
          element={<FreelancerProfile />}
        />

        <Route
          path="/freelancer-profile"
          element={<FreelancerProfile />}
        />

        {/* My Projects */}
        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />

        {/* Edit Project */}
        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;