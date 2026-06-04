import React, { useState } from "react";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Welcome back</h2>
        <p>Login to continue to SkillVerse</p>

        {/* SOCIAL LOGIN */}
        <button className="google-btn">Continue with Google</button>
        <button className="facebook-btn">Continue with Facebook</button>
        <button className="apple-btn">Continue with Apple</button>

        <div className="divider">OR</div>

        {/* EMAIL LOGIN */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <p className="switch">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>

      </div>

    </div>
  );
}

export default Login;
