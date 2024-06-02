import React from "react";
import "./style.scss";
import { nanoid } from "nanoid";
// import footerLogo from '../../../assets/images/footerLogo.svg';
import logo from "../../../assets/images/logo.svg";

const ContactInfo: React.FC = () => {

  interface ContactInfo {
    icon: JSX.Element;
    title: string;
  }
  const contactInfoArray: ContactInfo[] = [
    {
      icon: <i className="fa-solid fa-phone-volume"></i>,
      title: "+91 8802940317"
    },
    {
      icon: <i className="fa-regular fa-envelope"></i>,
      title: "abc@edTech.com"
    }
  ];

  return (
    <div className="pagesContainer">
      {/* <img className="footer-logo" src={footerLogo} /> */}
      <div className="footer-logo">
        <img src={logo} alt="" />
        <h2 > SprintUp</h2>
      </div>
      <ul>
        {
          contactInfoArray.map((item) => (
            <li key={nanoid()}>
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </li>
          ))
        }
      </ul>
      <div className="social-media">
        <a
          href="#"
          target="_blank
          "
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          href="#"
          target="_blank
          "
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="#"
          target="_blank
          "
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
        {/* <a
              href="#"
              target="_blank
          "
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i> 
            </a> */}
      </div>
    </div>
  )
}

export default ContactInfo;