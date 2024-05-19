import React from "react";
import styles from "./style.module.scss";
import { Course } from "../../../types/types";
import { IoIosPeople } from "react-icons/io";
import { MdAccessTime } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import developerImg from '../../../assets/images/developer.png';

const CourseCardHorizontal: React.FC<Course> = ({
  title,
  duration,
  seatsLeft,
  // description,
  curriculum,
  placement,
  brochureLink,
  learnMoreLink,
  catagory,
}) => {
  return (
    <div className={styles.courseCardHorizontal}>
      <div className={styles.titleBox}>
      <div className={styles.cardCatagory}>{catagory}</div>
        <img src={developerImg} alt="" />
        <h2 className={styles.cardTitle}>{title}</h2>
        <div className={styles.courseInfo}>
          <h5>
            <MdAccessTime/>
            Duration: <span>{duration}</span>
          </h5>
          <h5>
          <IoIosPeople />
            Seats Left: <span>{seatsLeft}</span>
          </h5>
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.curriculum}>
          <h3><FaGraduationCap /> CURRICULUM</h3>
          <ul>
            {curriculum.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.placement}>
          <h3><FaSuitcase /> PLACEMENT</h3>
          <ul>
            {placement.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cardButtons}>
          <a href={brochureLink || "#"}>Brochure <MdOutlineFileDownload /></a>
          <a href={learnMoreLink || "#"}>Learn More <MdKeyboardArrowRight /></a>
        </div>
      </div>
    </div>
  );
};

export default CourseCardHorizontal;
