import React from "react";
import styles from "./AboutUs.module.scss";
import instructorListData from "../../../data/teamInfo.json";
import { Instructor } from "../../../types/types";
import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const AboutUs: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutUs}>
        <h1 className={styles.sectionTitle}>The Team</h1>
        <p className={styles.sectionDesc}>Fueled with passion for learning</p>
        <hr />
        <div className={styles.profileContainer}>
          {instructorListData.map((personInfo: Instructor) => (
            <div className={styles.profile}>
              <div className={styles.profile__imageContainer}>
                <img src={personInfo.profilePicture} alt="Profile Picture" />
              </div>
              <h2 className={styles.profile__name}>{personInfo.name}</h2>
              <p className={styles.profile__designation}>
                {personInfo.designation}
              </p>
              <p className={styles.profile__college}>{personInfo.college}</p>
              <div className={styles.socialMedia}>
                <a href={personInfo.linkedin || "#"} target="_blank">
                  <FaLinkedin />
                </a>
                <a href={personInfo.instagram || "#"} target="_blank">
                  <AiFillInstagram />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
