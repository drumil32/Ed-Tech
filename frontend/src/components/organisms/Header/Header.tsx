import React, { useEffect, useState } from "react";
import "./style.scss";
import Button from "../../atoms/Button/Button";
import MobileNavbar from "./MobileNavbar";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="header">
        <div className={"header_logo"}>
          <h2>CodeCademy</h2>
        </div>
        <nav className={"header_navigation"}>
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>Home</li>
            </NavLink>
            <Link to="#">
              <li>About Us</li>
            </Link>
            <NavLink
              to="/faqs"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>FAQs</li>
            </NavLink>
            <Link to="#">
              <li>Pricing</li>
            </Link>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>Contacts</li>
            </NavLink>
          </ul>
        </nav>
        <div className={"header_right_section"}>
          <Button text="Log In" className="header_login" />
          <Button text="Sign Up" />
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
