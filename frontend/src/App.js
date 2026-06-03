import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FreelancerDashboard from "./pages/dashboard/FreelancerDashboard";
import { Routes, Route } from "react-router-dom";
import ClientProfile from "./pages/client/ClientProfile";
import PostProject from "./pages/projects/PostProject";
import ProjectList from "./pages/projects/ProjectList";
import SubmitProposal from "./pages/projects/SubmitProposal";
import Messages from "./pages/messages/Messages";
import Navbar from "./components/common/Navbar";
import Footer from "./components/layout/Footer";
import FreelancerProfile from "./pages/freelancer/FreelancerProfile";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Categories from "./components/home/Categories";
import FeaturedFreelancers from "./components/home/FeaturedFreelancers";
import Reviews from "./components/home/Reviews";
import CTA from "./components/home/CTA";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FreelancerSearch from "./pages/freelancer/FreelancerSearch";
import CategorySearch from "./pages/search/CategorySearch";

// Pages
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
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Stats />
              <Categories />
              <FeaturedFreelancers />
              <Reviews />
              <CTA />
              <Footer />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/dashboard" element={<FreelancerDashboard />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/proposal" element={<SubmitProposal />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/freelancers" element={<FreelancerSearch />} />
        <Route path="/search" element={<CategorySearch />} />
      </Routes>
    </>
  );
}

export default App;
