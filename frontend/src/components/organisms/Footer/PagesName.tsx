import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const PagesName: React.FC = () => {
  const [scrollToCourses, setScrollToCourses] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollToCourses && location.pathname === "/") {
      const timer = setTimeout(() => {
        const element = document.getElementById("courses");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setScrollToCourses(false);
      }, 300);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="pagesContainer">
      <ul>
        <li>
          <Link to="/" onClick={scrollToTop}>Home</Link>
        </li>
        <li>
          <a onClick={handleCoursesClick}>Courses</a>
        </li>
        <li>
          <HashLink to="#">Our Values</HashLink>
        </li>
        <li>
          <Link to="/contact" onClick={scrollToTop}>Contact Us</Link>
        </li>
        {/* <li>
          <Link to="/faqs" onClick={scrollToTop}>FAQs</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default PagesName;
