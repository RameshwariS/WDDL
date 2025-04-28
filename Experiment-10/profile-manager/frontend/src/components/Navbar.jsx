import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        exact="true"
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Login
      </NavLink>
      <NavLink 
        to="/register" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Register
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default Navbar;