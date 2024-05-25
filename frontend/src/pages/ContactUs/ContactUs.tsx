import React, { useState } from 'react'
import styles from './styles.module.scss';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';

const ContactUs: React.FC = () => {
    const [inputName, setInputName] = useState<string>("");
    const [inputNumber, setInputNumber] = useState<number | string>("");
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const contactData = [
        {
            title: "Phone",
            value: "+91 8802940317",
            icon: (<FiPhoneCall />)
        },
        {
            title: "Email",
            value: "enquiry@cadecademy.in",
            icon: (<MdOutlineEmail />)
        },
    ]
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputName, inputNumber);
    
        // Here you can perform further validation before submitting the form or API call
        setFormSubmitted(true);
      };
    return (
      
        <div>
         
          <div className={styles.heading}>
               <div className={styles.headingTitle}>
                    <h1>Contact Us</h1>
                    <h4>Home / <span>Contact Us</span></h4>
               </div>
          </div>
        <div className={styles.contacts}>
            <div className={styles.right_section}>
                <h2>We would love to hear from you!</h2>
                <p>Let us know what you’re after.</p>
                {contactData.map((data, i) => {
                    return (
                        <div key={i} className={styles.contactDetalsBox}>
                            <div className={styles.icon}>
                            {data.icon}
                            </div>
                            <div className={styles.contactDetals}>
                                <h3>{data.title}</h3>
                                <p>{data.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.left_section}>
            <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            required={true}
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Input
            label="Mobile Number"
            required={true}
            type="tel"
            pattern="[0-9]{10}"
            placeholder="XXXXXXXXXX"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <p className="declaration">
            By clicking “Submit”, you agree to receive SMS texts and marketing
            calls from Codecademy.
          </p>
          <Button text="Submit" style={{ width: "100%" }} />

        </form>
        {formSubmitted && (
          <p className="success-message">Thank you for submitting the form!</p>
        )}
            </div>
        </div>
        </div>
    )
}

export default ContactUs;