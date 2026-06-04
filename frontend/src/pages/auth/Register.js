import React, { useState } from "react";
import "./Auth.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Create account</h2>
        <p>Join SkillVerse and start freelancing</p>

        {/* SOCIAL */}
        <button className="google-btn">Continue with Google</button>
        <button className="facebook-btn">Continue with Facebook</button>
        <button className="apple-btn">Continue with Apple</button>

        <div className="divider">OR</div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email address"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="primary-btn" type="submit">
            Create account
          </button>

        </form>

        <p className="switch">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>

    </div>
  );
}

export default Register;
