import React from "react";
import { motion } from "framer-motion";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="container hero-content">

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Hire Top Freelancers <br />
          Like Fiverr 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          SkillVerse is your premium freelance marketplace for developers, designers & creators.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
