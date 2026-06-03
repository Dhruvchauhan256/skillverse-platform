import React from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
