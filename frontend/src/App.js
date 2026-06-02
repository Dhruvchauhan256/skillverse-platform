import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Categories from "./components/home/Categories";
import FeaturedFreelancers from "./components/home/FeaturedFreelancers";
import Reviews from "./components/home/Reviews";
import CTA from "./components/home/CTA";

import Login from "./pages/Login";
import Register from "./pages/Register";

const FindWork = () => <h2>Find Work Page</h2>;
const FindTalent = () => <h2>Find Talent Page</h2>;

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
      </Routes>
    </>
  );
}

export default App;
