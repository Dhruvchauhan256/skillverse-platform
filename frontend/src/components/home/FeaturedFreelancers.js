import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const fetchFreelancers = async () => {
  try {
    const res = await axios.get(`${API}/api/freelancers`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};