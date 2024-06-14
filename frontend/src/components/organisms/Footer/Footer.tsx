import React from "react";
import "./style.scss";
import PagesName from "./PagesName";
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer">
        <div className="credits">
          <h2>Built by students of the same program</h2>
          <div className="developerImageContainer">
            <a
              href="https://www.linkedin.com/in/mayank-gupta-752328173/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer mayank"
            >
              <img src="/assets/developer/mayank.jpg" alt="mayank" />
            </a>
            <a
              href="https://www.linkedin.com/in/drumil-akhenia/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer drumil"
            >
              <img src="/assets/developer/drumil.jpg" alt="drumil" />
            </a>
          </div>
        </div>
        <div className="information">
          <ContactInfo />
          <div className="footer_rightSection">
            <PagesName />
            <div className="another-navigation">
              <ul>
                <li>
                  <Link style={{ color: "white" }} to="/faqs">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link style={{ color: "white" }} to="/faqs">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link style={{ color: "white" }} to="/faqs">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
