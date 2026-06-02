import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Categories from "./components/Categories";
import FeaturedFreelancers from "./components/FeaturedFreelancers";
import Reviews from "./components/Reviews";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <FeaturedFreelancers />
      <Reviews />
      <CTA />
      <Footer />
    </>
  );
}

export default App;
