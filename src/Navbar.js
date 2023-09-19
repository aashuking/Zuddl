import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand h1"><h1>Zuddl Board</h1></a>
      <img
        src="https://avatars.githubusercontent.com/u/123456789?v=4"
        width="40"
        height="40"
        alt="User Logo"
        className="user-logo"
      />

    </nav>
  );
};

export default Navbar;
