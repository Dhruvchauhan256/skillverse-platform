import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTasks, FaCheckCircle } from "react-icons/fa";

function FreelancerDashboard() {
  const cards = [
    { title: "Total Earnings", value: "₹12,500", icon: <FaWallet /> },
    { title: "Active Projects", value: "3", icon: <FaTasks /> },
    { title: "Completed Jobs", value: "18", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="container mt-5">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Freelancer Dashboard
      </motion.h2>

      <div className="row mt-4">

        {cards.map((card, i) => (
          <div className="col-md-4" key={i}>
            <motion.div
              className="card p-4 text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div style={{ fontSize: "30px" }}>{card.icon}</div>
              <h5 className="mt-2">{card.title}</h5>
              <h3>{card.value}</h3>
            </motion.div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default FreelancerDashboard;
