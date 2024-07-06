import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/assets/logo.svg";
import { useMedia } from "react-use";
import MobileNavbar from "../MobileNavbar";
import classNames from "classnames";

const DashboardHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const isMobile = useMedia("(max-width: 575px)");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollToCourses && location.pathname === "/") {
      const timer = setTimeout(() => {
        const element = document.getElementById("courses");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setScrollToCourses(false);
      }, 300); // Delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }
  }, [location, scrollToCourses]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={scrolled ? styles.scrolled : ""}>
        <div className={styles.header}>
          {isMobile ? <MobileNavbar /> : null}
          <div className={styles.header_logo}>
            {!isMobile ? <MobileNavbar /> : null}
            <Link to="/" onClick={scrollToTop} className={styles.logo}>
              <img src={logo} alt="" />
              <h2>SprintUp</h2>
            </Link>
          </div>
          <nav className={styles.header_navigation}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  onClick={scrollToTop}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/course-details"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/values"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  onClick={scrollToTop}
                >
                  Our Values
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.header_btns}>
            <Link to="/login" className={classNames(styles.header_btn, styles.login)}>
              Log In
            </Link>
            {!isMobile ? (
              <Link to="/signup" className={classNames(styles.header_btn, styles.signup)}>
                Sign Up
              </Link>
            ) : null}
          </div>
        </div>
      </header>
      <a href="#" className={classNames(styles.backToTop, scrolled && styles.visible)}>
        <MdOutlineKeyboardDoubleArrowUp />
      </a>
    </>
  );
};

export default DashboardHeader;
