import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Categories from "./components/Categories";
import FeaturedFreelancers from "./components/FeaturedFreelancers";
import Reviews from "./components/Reviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// Pages (temporary placeholders)
const FindWork = () => <h2 className="text-center mt-5">Find Work Page</h2>;
const FindTalent = () => <h2 className="text-center mt-5">Find Talent Page</h2>;
const Login = () => <h2 className="text-center mt-5">Login Page</h2>;
const Signup = () => <h2 className="text-center mt-5">Signup Page</h2>;

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

        <Route path="/find-work" element={<FindWork />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
