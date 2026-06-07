import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FreelancerDashboard.css";

function FreelancerDashboard() {
const [user, setUser] = useState(null);

useEffect(() => {
fetchProfile();
}, []);

const fetchProfile = async () => {
try {
const token = localStorage.getItem("token");

```
  const res = await axios.get(
    "http://localhost:5000/api/profile/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setUser(res.data.user);

  console.log("PROFILE DATA:", res.data);
} catch (error) {
  console.log(error);
}
```

};

return ( <div className="dashboard">

```
  {/* USER INFO */}
  {user && (
    <div className="panel mb-4">
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )}

  {/* TOP STATS */}
  <div className="stats-grid">

    <div className="stat-card">
      <h3>Total Earnings</h3>
      <p>$1,240</p>
    </div>

    <div className="stat-card">
      <h3>Active Proposals</h3>
      <p>8</p>
    </div>

    <div className="stat-card">
      <h3>Completed Jobs</h3>
      <p>24</p>
    </div>

    <div className="stat-card">
      <h3>Profile Views</h3>
      <p>1,532</p>
    </div>

  </div>

  {/* MAIN CONTENT */}
  <div className="dashboard-grid">

    <div className="panel">
      <h3>Recent Activity</h3>
      <p>✔ You sent a proposal to "React Dashboard Project"</p>
      <p>✔ Client viewed your profile</p>
      <p>✔ New job match found</p>
    </div>

    <div className="panel">
      <h3>Profile Completion</h3>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
      <p>80% complete</p>
    </div>

  </div>

</div>
```

);
}

export default FreelancerDashboard;
