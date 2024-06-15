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
import contactDetails from "../.../../../data/contactDetails.json";
import { toast } from "react-toastify";

const ContactUs: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);
  const [messageTextError, setMessageTextError] = useState<string | null>(null);

  const contactData = [
    {
      title: "Phone",
      value: contactDetails.phone,
      icon: <FiPhoneCall />,
    },
    {
      title: "Email",
      value: contactDetails.email,
      icon: <MdOutlineEmail />,
    },
  ];
  const validateName = (value: string): string | null => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (value.trim().length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (!namePattern.test(value)) {
      return "Name can only contain alphabets and spaces.";
    }
    if (value.trim().length > 50) {
      return "Name can not have more than 50 characters.";
    }
    return null;
  };
  const validatePhoneNumber = (value: string): string | null => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return null;
  };
  const validateMessage = (value: string): string | null => {
    if (value.trim().length > 200) {
      return "Please enter a valid message.";
    }
    return null;
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(inputName);
    const numberError = validatePhoneNumber(inputNumber);
    const messageTextError = validateMessage(messageText);
    setNameError(nameError);
    setNumberError(numberError);
    setMessageTextError(messageTextError);

    if (nameError || numberError || messageTextError) {
      return;
    }

    const data = {
      name: inputName,
      phoneNumber: inputNumber
    };

    try {
      // USE ENV VARIABLE here with name BACKEND_URL
      const response = await axios.post('http://localhost:3000/request-a-callback', data);
      console.log('Response:', response.data);
      setFormSubmitted(true);
      toast.success("We will connect you soon!");
    } catch (error) {
      toast.error("Some went wrong. please try again later.");
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
              errorMessage={nameError}
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
              errorMessage={numberError}
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
