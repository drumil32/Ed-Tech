import React from "react";
import "./style.scss";
import PagesName from "./PagesName";
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";

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
                <li>
                  <Link style={{ color: "white" }} to="/faqs" >FAQs</Link>
                </li>
                <li>
                  <Link style={{ color: "white" }} to="/faqs" >Terms of Use</Link>
                </li>
                <li>
                  <Link style={{ color: "white" }} to="/faqs" >Privacy Policy</Link>
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
