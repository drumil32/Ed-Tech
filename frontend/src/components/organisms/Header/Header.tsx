import React, { useEffect, useState } from "react";
import "./style.scss";
import MobileNavbar from "./MobileNavbar";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import logo from "/assets/logo.svg";
import { useMedia } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axiosInstance from "../../../utils/axiosInstance";
import restEndPoints from "../../../data/restEndPoints.json";
import { toast } from "react-toastify";
import { setUserDetails } from "../../../redux/slices/UserSliice";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const isMobile = useMedia("(max-width: 575px)");
  const dispatch = useDispatch();

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

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get(`/${restEndPoints.logout}`);
      localStorage.removeItem("token");
      dispatch(setUserDetails(null));
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="header">
          {isMobile ? <MobileNavbar /> : null}
          <div className={"header_logo"}>
            {!isMobile ? <MobileNavbar /> : null}
            <Link to="/" onClick={scrollToTop} className="logo">
              <img src={logo} alt="" />
              <h2>SprintUp</h2>
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
                {/* <a onClick={handleCoursesClick}>Courses</a> */}
                <NavLink
                  to="/course-details"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/values"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={scrollToTop}
                >
                  Our Values
                </NavLink>
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
          {!user ? (
            <div className="header_btns">
              <Link to="/login" className="header_btn login">
                Log In
              </Link>
              {!isMobile ? (
                <Link to="/signup" className="header_btn signup">
                  Sign Up
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="header_btns">
              <p
                className="header_btn signup"
                onClick={handleLogout}
              >
                Log Out
              </p>
            </div>
          )}
        </div>
      </header>
      <a href="#" className={scrolled ? "back-to-top visible" : "back-to-top"}>
        <MdOutlineKeyboardDoubleArrowUp />
      </a>
    </>
  );
};

export default Header;
