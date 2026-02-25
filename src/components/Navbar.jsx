import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("demoUser"));
    setUser(savedUser);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="logo">💜 MindCare</div>

      <div className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/journal">Journal</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/self-test">Self-Assessment</NavLink>
      </div>

      <button onClick={handleLogout} className="login-btn">
        Logout
      </button>
    </nav>
  );
}