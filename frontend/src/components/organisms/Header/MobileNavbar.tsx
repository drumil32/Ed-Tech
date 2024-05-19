// MobileNavbar.tsx

import React, { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";

const MobileNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <div className={`mobile-navbar ${menuOpen ? "open" : ""}`}>
      <div className="hamburgerIcon" onClick={toggleMenu}>
        {menuOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </div>
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            <li>Home</li>
          </NavLink>
          <Link to="#">
            <li>About Us</li>
          </Link>
          <NavLink
            to="/faqs"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            <li>FAQs</li>
          </NavLink>
          <Link to="#">
            <li>Pricing</li>
          </Link>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            <li>Contacts</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavbar;
