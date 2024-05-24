import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import Carausal from "../../molecule/Carausal/Carausal";
import image1 from "../../../assets/images/carousal/image1.svg";
import image2 from "../../../assets/images/carousal/image2.svg";
import image3 from "../../../assets/images/carousal/image3.svg";
// import profileImage from "../../../assets/images/carousal/profileImage.jpeg";

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
      title: "IN-CLASS SESSIONS BY THE BEST",
      image: image1,
      desc: ["Live in-class sessions for optimum learning", "In-class dedicated doubt clearance"],
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(inputName, inputNumber);

    // Here you can perform further validation before submitting the form or API call
    setFormSubmitted(true);
  };

  const [timeSlot,setTimeSlot] = useState<Number>(0);

  return (
    <section className="hero-section">
      <div className="hero">
        <Carausal data={carausalData} />
        <div className="signUpform">
          <div>
            <h2>Build Your Tech Career With Us</h2>
            {/* <h2>Career With Us:</h2> */}
            {/* <h2>Get the best jobs</h2> */}
            <h3>Best full-stack course designed by IIT & BITS alums</h3>
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
               <div style={{display:"flex",flexDirection:"row",textAlign:"center",justifyContent:"center",color:"black"}}>
                <div className="timeSlot NoPreference" onClick={()=>{setTimeSlot(0);}} style={0 == timeSlot ? {backgroundColor:"#FFD500",color:"black",border:"none"} : {}}>
                  <p>No Preference</p>
                </div>
                <div className="sizeBox"></div>
                <div className="timeSlot schedule" onClick={()=>{setTimeSlot(1);}}  style={1 == timeSlot ? {backgroundColor:"#3a10e5",color:"white",border:"none"} : {}}>
                  <p>15 Jun</p>
                  <p>11:00 AM</p>
                </div>
                <div className="sizeBox"></div>
                <div className="timeSlot schedule" onClick={()=>{setTimeSlot(2);}}  style={2 == timeSlot ? {backgroundColor:"#3a10e5",color:"white",border:"none"} : {}}>
                  <p>22 Jun</p>
                  <p>4:00 PM</p>
                </div>
              </div>
              <Button text="Book a Live Class" style={{ width: "100%" }} />
            </form>
            {formSubmitted && (
              <p className="success-message">
                Thank you for submitting the form!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
