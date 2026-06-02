import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Footer />
    </>
  );
}

export default App;
