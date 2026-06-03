import React from "react";
import { motion } from "framer-motion";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="container hero-content">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hire Top Freelancers <br />
          & Grow Your Business 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          SkillVerse connects clients with top developers, designers and digital experts worldwide.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button className="btn-primary">Hire Talent</button>
          <button className="btn-secondary">Find Work</button>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
