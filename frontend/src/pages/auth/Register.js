import React, { useState } from "react";
import "../../styles/auth.css";
import { Link } from "react-router-dom";

function Register() {
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
role: "freelancer",
remember: false,
});

const handleChange = (e) => {
const { name, value, type, checked } = e.target;

```
setFormData({
  ...formData,
  [name]: type === "checkbox" ? checked : value,
});
```

};

const handleSubmit = (e) => {
e.preventDefault();

```
console.log("Register Data:", formData);

alert("Frontend Signup Successful!");
```

};

return ( <div className="auth-container"> <div className="auth-card"> <h2>Create Your SkillVerse Account</h2> <p className="text-muted">
Join as a Freelancer or Client </p>

```
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="form-select mb-3"
      >
        <option value="freelancer">Freelancer</option>
        <option value="client">Client</option>
      </select>

      <div className="form-check mb-3 text-start">
        <input
          className="form-check-input"
          type="checkbox"
          id="remember"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
        />

        <label
          className="form-check-label"
          htmlFor="remember"
        >
          Remember Me
        </label>
      </div>

      <button type="submit">
        Create Account
      </button>
    </form>

    <div className="mt-3">
      <Link
        to="/forgot-password"
        className="text-decoration-none"
      >
        Forgot Password?
      </Link>
    </div>

    <p className="mt-3">
      Already have an account?{" "}
      <Link to="/login">Login</Link>
    </p>
  </div>
</div>
```

);
}

export default Register;
