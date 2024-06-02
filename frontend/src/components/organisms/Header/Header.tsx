import React, { useEffect, useState } from "react";
import "./style.scss";
import MobileNavbar from "./MobileNavbar";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "../../../assets/images/logo.svg";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleCoursesClick = () => {
    if (location.pathname === "/") {
      const element = document.getElementById("courses");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setScrollToCourses(true);
      navigate("/");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="header">
          <div className={"header_logo"} >
            <MobileNavbar />
            <Link to="/" onClick={scrollToTop}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "black",
                // border: "2px solid black"
                //   align- items: center;
                // justify-content: space-between;
                // color: black;
              }}>
                <img src={logo} height={60} alt="" />
                <h2>
                  SprintUp
                </h2>
              </div>
            </Link>
          </div>
          <nav className={"header_navigation"}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={scrollToTop}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <a onClick={handleCoursesClick}>Courses</a>
              </li>
              <li>
                <HashLink to="#">Our Values</HashLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header >
      <div className="header-highlight">
        <p>Lucknow's top offline MERN-stack program. Hurry, limited seats open!</p>
      </div>
      <a href="#" className={scrolled ? "back-to-top visible" : "back-to-top"}><MdOutlineKeyboardDoubleArrowUp /></a>
    </>
  );
};

export default Header;
