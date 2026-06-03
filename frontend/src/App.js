import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Pages
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

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Simple pages
const FindWork = () => (
  <div className="text-center mt-5">
    <h2>Find Work Page</h2>
  </div>
);

const FindTalent = () => (
  <div className="text-center mt-5">
    <h2>Find Talent Page</h2>
  </div>
);

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* HOME PAGE (FIXED) */}
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
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/client-profile" element={<ClientProfile />} />

        {/* PROJECTS */}
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/proposal" element={<SubmitProposal />} />

        {/* MESSAGES */}
        <Route path="/messages" element={<Messages />} />
          <Route path="/" element={<h1>HOME TEST WORKING</h1>} />

      </Routes>
    </>
  );
}

export default App;
