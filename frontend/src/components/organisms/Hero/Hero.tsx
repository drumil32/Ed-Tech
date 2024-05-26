import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Carausal from "../../molecule/Carausal/Carausal";
import image1 from "../../../assets/images/carousal/image1.svg";
import image2 from "../../../assets/images/carousal/image2.svg";
import image3 from "../../../assets/images/carousal/image3.svg";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import axios from 'axios';

export interface ProfileData {
  image: string;
  desc: string;
  name: string;
  location: string;
}
export interface SlideData {
  title: string;
  image?: string;
  desc?: string[];
  profiles?: ProfileData[];
  type?: "image" | "profile";
}

const Hero: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [timeSlot, setTimeSlot] = useState<Number | null>(null);

  const carausalData: SlideData[] = [
    // {
    //   title: "OUR LEARNERS GET RESULTS",
    //   profiles: [
    //     {
    //       image: profileImage,
    //       desc: "Intern to Full-Stack Software Developer at IBM",
    //       name: "Aniket Artani",
    //       location: "IBM, Banglore",
    //     },
    //     {
    //       image: profileImage,
    //       desc: "Intern to Full-Stack Software Developer at IBM",
    //       name: "Aniket Artani",
    //       location: "IBM, Banglore",
    //     },
    //     {
    //       image: profileImage,
    //       desc: "Intern to Full-Stack Software Developer at IBM",
    //       name: "Aniket Artani",
    //       location: "IBM, Banglore",
    //     },
    //   ],
    //   type: "profile",
    // },
    {
      title: "IN-CLASS SESSIONS BY THE BEST",
      image: image1,
      desc: [
        "Live in-class sessions for optimum learning",
        "In-class dedicated doubt clearance",
      ],
    },
    {
      title: "FIND THE RIGHT JOB FOR YOU",
      image: image2,
      desc: [
        "At least 4 mock interviews by mentors",
        "Guaranteed jobs on course completion",
      ],
    },
    {
      title: "MOST INTERACTIVE COURSE",
      image: image3,
      desc: [
        "Work on 4 projects based on real-life applications",
        "Guaranteed 2-month thorough internship",
      ],
    },
  ];
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: inputName,
      phoneNumber: inputNumber,
      date: "25-05-2024",
      time: "09:38 PM"
    };

    try {
      // USE ENV VARIABLE here with name BACKEND_URL
      const response = await axios.post('http://localhost:3000/book-live-class', data);
      console.log('Response:', response.data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('There was an error making the request:', error);
    }
  };
  
  return (
    <section className="hero-section">
      <div className="hero">
        <Carausal data={carausalData} />
        <div className="hero-left">
          <div className="hero-form">
            <div className="form-title">
              <h2>Build Your Tech Career</h2>
              <h2> With Us</h2>
            </div>
            <div className="form-subtitle">
              <h3>Best full-stack course designed by IIT & BITS alums</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                icon={<FaUser />}
                placeholder="Full Name"
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
              <div className="hero-form-slots"
              >

                <div
                  className={`timeSlot ${timeSlot === 0 && "active"}`}
                  onClick={() => {
                    setTimeSlot(timeSlot === 0 ? null : 0);
                  }}
                >
                  <p>No Preference</p>
                </div>

                <div
                  className={`timeSlot ${timeSlot === 1 && "active"}`}
                  onClick={() => {
                    setTimeSlot(timeSlot === 1 ? null : 1);
                  }}
                >
                  <p>15 Jun</p>
                  <p>11:00 AM</p>
                </div>

                <div
                  className={`timeSlot ${timeSlot === 2 && "active"}`}
                  onClick={() => {
                    setTimeSlot(timeSlot === 2 ? null : 2);
                  }}
                >
                  <p>22 Jun</p>
                  <p>4:00 PM</p>
                </div>

              </div>
              <Button text="Book a Live Class" style={{ width: "100%", marginTop: "0.8rem" }} />
              {formSubmitted && (
                <p className="success-message">
                  Thank you for submitting the form!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
