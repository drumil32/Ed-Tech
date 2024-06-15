import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import Textarea from "../../components/atoms/TextArea/TextArea";
import axios from "axios";

const ContactUs: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const contactData = [
    {
      title: "Phone",
      value: "+91 8802940317",
      icon: <FiPhoneCall />,
    },
    {
      title: "Email",
      value: "support.sprintup@gmail.com",
      icon: <MdOutlineEmail />,
    },
  ];
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputName, inputNumber);

    const data = {
      name: inputName,
      phoneNumber: inputNumber
    };

    try {
      // USE ENV VARIABLE here with name BACKEND_URL
      const response = await axios.post('http://localhost:3000/request-a-callback', data);
      console.log('Response:', response.data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('There was an error making the request:', error);
    }
  };
  return (
    <div>
      {/* <div className={styles.heading}>
        <div className={styles.headingTitle}>
          <h1>Contact Us</h1>
          <h4>
            Home / <span>Contact Us</span>
          </h4>
        </div>
      </div> */}
      <div className={styles.contacts}>
        <div className={styles.left_section}>
          <h2>We would love to hear from you!</h2>
          {/* <p>Let us know what you’re after.</p> */}
          {contactData.map((data, i) => {
            return (
              <div key={i} className={styles.contactDetalsBox}>
                <div className={styles.icon}>{data.icon}</div>
                <div className={styles.contactDetals}>
                  <h3>{data.title}</h3>
                  <p>{data.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.right_section}>
          <p>Let us know what you’re after.</p>
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              icon={<FaUser />}
              placeholder="Enter your name"
              required={true}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Input
              label="Mobile Number"
              icon={<FaPhoneAlt />}
              required={true}
              type="tel"
              pattern="[0-9]{10}"
              placeholder="10 digits Mobile Number"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
            />
            <Textarea
              label="Your Message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={5}
              placeholder="Optional Message"
            />
            <Button text="Submit" style={{ width: "100%" }} />
            {formSubmitted && (
              <p className="success-message">You'll hear from us shortly</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
