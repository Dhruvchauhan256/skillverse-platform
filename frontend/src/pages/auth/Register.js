import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.username,
          email: form.email,
          password: form.password,
          role: "freelancer",
        }
      );

      alert("Registration Successful!");
      console.log(response.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create account</h2>
        <p>Join SkillVerse and start freelancing</p>

        <button className="google-btn">Continue with Google</button>
        <button className="facebook-btn">Continue with Facebook</button>
        <button className="apple-btn">Continue with Apple</button>

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="primary-btn" type="submit">
            Create account
          </button>
        </form>

        <p className="switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
