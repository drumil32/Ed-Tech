import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Carausal from "../../molecule/Carausal/Carausal";
import image1 from "../../../assets/images/carousal/In-Class Sessions by the Best.svg";
import image2 from "../../../assets/images/carousal/Find The Right Job For You.svg";
import image3 from "../../../assets/images/carousal/Most Interactive Course.svg";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import Lottie from "react-lottie-player";
import loaderData from "../../../assets/Lottie/loader.json";

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
  const [inputNumber, setInputNumber] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [timeSlot, setTimeSlot] = useState<Number | null>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [numberError, setNumberError] = useState<string | null>(null);

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
      title: "IN-CLASS SESSIONS</br>BY THE BEST",
      image: image1,
      desc: [
        "Live in-class sessions for optimum learning",
        "In-class dedicated doubt clearance",
      ],
    },
    {
      title: "FIND THE RIGHT JOB</br>FOR YOU",
      image: image2,
      desc: [
        "Guaranteed jobs on course completion",
        "At least 4 mock interviews",
      ],
    },
    {
      title: "MOST INTERACTIVE</br>COURSE",
      image: image3,
      desc: [
        "Guaranteed 2-month internship",
        "Work on 4 real-world projects",
      ],
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
    return null;
  };
  const validatePhoneNumber = (value: string): string | null => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return null;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = validateName(inputName);
    const numberError = validatePhoneNumber(inputNumber);
    setNameError(nameError);
    setNumberError(numberError);

    if (nameError || numberError) {
      return;
    }

    setLoading(true);
    const date =
      timeSlot === 0
        ? "25-05-2024"
        : timeSlot === 1
          ? "15-06-2023"
          : "22-06-2023";
    const time =
      timeSlot === 0 ? "09:30" : timeSlot === 1 ? "11:00 AM" : "04:00 PM";

    const data = {
      name: inputName,
      phoneNumber: inputNumber,
      date: date,
      time: time,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/book-live-class",
        data
      );
      console.log("Response:", response.data);
      setFormSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("There was an error making the request:", error);
      setLoading(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero">
        <Carausal data={carausalData} />
        <div className="hero-right">
          <div className="hero-form">
            <div className="form-title">
              <h2>Build Your Tech Career With Us</h2>
            </div>
            <div className="form-subtitle">
              <h3>Best full-stack course designed</h3>
              <h3> by IIT & BITS alums</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                icon={<FaUser />}
                placeholder="Full Name"
                value={inputName}
                disabled={isLoading || formSubmitted}
                errorMessage={nameError}
                onChange={(e) => setInputName(e.target.value)}
              />
              <Input
                label="Mobile Number"
                icon={<FaPhoneAlt />}
                type="tel"
                placeholder="10 digits Mobile Number"
                value={inputNumber}
                disabled={isLoading || formSubmitted}
                errorMessage={numberError}
                onChange={(e) => setInputNumber(e.target.value)}
              />
              <div className="hero-form-slots">
                <div
                  className={`timeSlot ${timeSlot === 0 && "active"}`}
                  onClick={() => {
                    isLoading ||
                      (!formSubmitted &&
                        setTimeSlot(timeSlot === 0 ? null : 0));
                  }}
                >
                  <p>No Preference</p>
                </div>

                <div
                  className={`timeSlot ${timeSlot === 1 && "active"}`}
                  onClick={() => {
                    isLoading ||
                      (!formSubmitted &&
                        setTimeSlot(timeSlot === 1 ? null : 1));
                  }}
                >
                  <p>15 June</p>
                  <p>11:00 AM</p>
                </div>

                <div
                  className={`timeSlot ${timeSlot === 2 && "active"}`}
                  onClick={() => {
                    isLoading ||
                      (!formSubmitted &&
                        setTimeSlot(timeSlot === 2 ? null : 2));
                  }}
                >
                  <p>22 June</p>
                  <p>4:00 PM</p>
                </div>
              </div>
              {isLoading ? (
                <div className="form-loader">
                  <Lottie
                    loop
                    animationData={loaderData}
                    play
                    style={{ width: 40, height: 40 }}
                  />
                </div>
              ) : (
                <Button
                  text="Book a Live Class"
                  style={{ width: "100%", marginTop: "0.8rem" }}
                  disabled={formSubmitted}
                />
              )}
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
