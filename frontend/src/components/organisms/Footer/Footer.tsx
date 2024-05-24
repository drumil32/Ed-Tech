import React from "react";
import "./style.scss";
import PagesName from "./PagesName";
import { Link } from "react-router-dom";
import ContactInfo from "./ContactInfo";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer">
        <div className="information">
          <ContactInfo />
          <div className="footer_rightSection">
            <PagesName />
            <div className="another-navigation">
              <ul>
                <li >FAQs</li>
                <li >Terms of Use</li>
                <li >Privacy Policy</li>
              </ul>
            </div>
            {/* <div className="social-media">
              <Link to="/faqs" >FAQs</Link>
              <Link to="/" >Terms of Use</Link>
              <Link to="/" >Privacy Policy</Link>
               <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook-f"></i>{" "}
                <span>Facebook</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin-in"></i>{" "}
                <span>LinkedIn</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>{" "}
                <span>Instagram</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter"></i> <span>Twitter</span>
              </a> 
            </div> */}
          </div>
        </div>
        {/* <p className="copyright">Copyright © Fluidesigns Pvt. Ltd.</p> */}
      </div>
    </footer>
  );
};

export default Footer;
