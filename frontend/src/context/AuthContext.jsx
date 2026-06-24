import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.post(
        "/api/auth/verify",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}