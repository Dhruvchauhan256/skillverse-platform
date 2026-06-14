import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar.jsx";
import MobileNav from "./components/common/MobileNav.jsx";

// Auth guard
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Home from "./pages/Home";
import FindTalent from "./pages/FindTalent";
import FindWork from "./pages/FindWork";
import JobsPage from "./pages/JobsPage";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import FreelancerDashboard from "./pages/dashboard/FreelancerDashboard";
import ClientDashboard from "./pages/dashboard/ClientDashboard";

import ClientProfile from "./pages/client/ClientProfile";

import PostProject from "./pages/projects/PostProject";
import ProjectList from "./pages/projects/ProjectList";
import SubmitProposal from "./pages/projects/SubmitProposal";
import MyProposals from "./pages/projects/MyProposals";
import MyProjects from "./pages/projects/MyProjects";
import EditProject from "./pages/projects/EditProject";

import Messages from "./pages/messages/Messages";

import FreelancerProfile from "./pages/freelancer/FreelancerProfile";
import FreelancerSearch from "./pages/freelancer/FreelancerSearch";

import CategorySearch from "./pages/search/CategorySearch";

function App() {
  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      {/* ROUTES ONLY */}
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/find-work" element={<FindWork />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/freelancers" element={<FreelancerSearch />} />
        <Route path="/search" element={<CategorySearch />} />
        <Route path="/jobs" element={<JobsPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client-profile"
          element={
            <ProtectedRoute>
              <ClientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-project"
          element={
            <ProtectedRoute>
              <PostProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proposal"
          element={
            <ProtectedRoute>
              <SubmitProposal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-proposals"
          element={
            <ProtectedRoute>
              <MyProposals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/proposal-management"
          element={
            <ProtectedRoute>
              <ProposalManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelancer/:name"
          element={<FreelancerProfile />}
        />

        <Route
          path="/freelancer-profile"
          element={<FreelancerProfile />}
        />

        <Route
          path="/my-projects"
          element={
            <ProtectedRoute>
              <MyProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* MOBILE NAV (IMPORTANT: OUTSIDE ROUTES) */}
      <MobileNav />
    </>
  );
}

export default App;
