import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Pages
import FindTalent from "./pages/FindTalent";
import FindWork from "./pages/FindWork";
import Home from "./pages/Home";
import FreelancerDashboard from "./pages/dashboard/FreelancerDashboard";
import ClientProfile from "./pages/client/ClientProfile";
import PostProject from "./pages/projects/PostProject";
import ProjectList from "./pages/projects/ProjectList";
import SubmitProposal from "./pages/projects/SubmitProposal";
import Messages from "./pages/messages/Messages";
import FreelancerProfile from "./pages/freelancer/FreelancerProfile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FreelancerSearch from "./pages/freelancer/FreelancerSearch";
import CategorySearch from "./pages/search/CategorySearch";
import JobsPage from "./pages/JobsPage";

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

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<FreelancerDashboard />} />
        <Route path="/client-profile" element={<ClientProfile />} />

        {/* PROJECTS */}
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/proposal" element={<SubmitProposal />} />

        {/* MESSAGES */}
        <Route path="/messages" element={<Messages />} />

        {/* FREELANCER PROFILE */}
        <Route path="/freelancer/:name" element={<FreelancerProfile />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />

        {/* JOBS */}
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </>
  );
}

export default App;
