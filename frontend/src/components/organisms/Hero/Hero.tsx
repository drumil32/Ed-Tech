import React, { useState } from "react";
import "./styles.scss";
// import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Carausal from "../../molecule/Carausal/Carausal";
import image1 from "../../../assets/images/carousal/image1.svg";
import image2 from "../../../assets/images/carousal/image2.svg";
import image3 from "../../../assets/images/carousal/image3.svg";
import profileImage from "../../../assets/images/carousal/profileImage.jpeg"

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
      title: "THE NEXT GENERATION OF LEARNING",
      image: image1,
      desc: [
        "Build skills quicker with AI assistance",
        "Gain experience with modern developer tools",
      ],
    },
    {
      title: "BUILD YOUR TECH CAREER",
      image: image2,
      desc: [
        "Get personalized job listings and practice interview questions",
        "Assess your job-readiness with AI",
      ],
    },
    {
      title: "BUILD AI SKILLS",
      image: image3,
      desc: [
        "AI courses and case studies on ChatGPT, NLP, and more",
        "AI-powered features for efficient learning",
      ],
    },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputName, inputNumber);

    // Here you can perform further validation before submitting the form or API call
    setFormSubmitted(true);
  };

  return (
    <section className="hero-section">
      <div className="hero">
        <Carausal data={carausalData} />
        <div className="signUpform">
          <h2>Build Your Tech Career</h2>
          <h3>Best tech course designed by IIT/IIM alums</h3>
          <form onSubmit={handleSubmit}>
            {/* <Input
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
          /> */}
            {/* <p className="declaration">
            By clicking “Submit”, you agree to receive SMS texts and marketing
            calls from Codecademy.
          </p> */}
            {/* <Button text="Submit" style={{ width: "100%" }} /> */}
            <Button text="Book a Live Class" style={{ width: "100%" }} />
          </form>
          {formSubmitted && (
            <p className="success-message">
              Thank you for submitting the form!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
