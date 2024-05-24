import React, { useState } from "react";
import "./styles.scss";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
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

const BookLiveClassForm: React.FC = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(inputName, inputNumber);

    // Here you can perform further validation before submitting the form or API call
    setFormSubmitted(true);
  };

  const [timeSlot,setTimeSlot] = useState<Number>(0);
  
 

  return (
    <section className="hero-section">
        <div className="signUpform" style={{borderRadius:"15px",backgroundColor:"#fcf2ef",margin:"50px",
          boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px;", maxWidth:"1000px",width:"100%"
        }} >
          <div style={{textAlign:"center"}}>
            <h2>Book a Live Class</h2>
            {/* <h2>Career With Us:</h2> */}
            {/* <h2>Get the best jobs</h2> */}
            <h3>We are planning a meet-up in your city</h3>
            <form onSubmit={handleSubmit} style={{margin:"auto"}}>
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
                <div className="timeSlot" onClick={()=>{setTimeSlot(0);}} style={0 == timeSlot ? {backgroundColor:"#FFD500",color:"black",border:"none"} : {}}>
                  <p>No Preference</p>
                </div>
                <div className="sizeBox"></div>
                <div className="timeSlot" onClick={()=>{setTimeSlot(1);}}  style={1 == timeSlot ? {backgroundColor:"#FFD500",color:"black",border:"none"} : {}}>
                  <p>15 Jun</p>
                  <p>11:00 AM</p>
                </div>
                <div className="sizeBox"></div>
                <div className="timeSlot" onClick={()=>{setTimeSlot(2);}}  style={2 == timeSlot ? {backgroundColor:"#FFD500",color:"black",border:"none"} : {}}>
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
    </section>
  );
};

export default BookLiveClassForm;
