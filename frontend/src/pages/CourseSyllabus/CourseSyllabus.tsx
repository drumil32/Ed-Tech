import React from "react";
import styles from "./CourseSyllabus.module.scss";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import { FaGraduationCap } from "react-icons/fa6";
import { MdFlightClass } from "react-icons/md";
import { SiInternetarchive, SiGoogleclassroom } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { GiFaceToFace } from "react-icons/gi";

const CourseSyllabus: React.FC = () => {
  return (
    <div className={styles.courseSyllabus}>
      <SidebarTriggerButton />
      <div className={styles.pageDetails}>
        <h5 className={styles.subject}>Job Path</h5>
        <h2 className={styles.title}>
          In-Classroom MERN Full-Stack Web Development Course
        </h2>
        <h3 className={styles.subTitle}>
          Enroll today to kickstart your tech career
        </h3>
        <p className={styles.desc}>
          Unlock your potential with our flagship course, specifically designed
          for students of all disciplines. This program offers top-quality tech
          education by experienced instructors from leading tech companies. We
          cover the latest in MongoDB, Express.js, React, and Node.js, equipping
          you with the skills to excel in the competitive tech industry. Upon
          completing the course, we guarantee a 100% job placement. Join us to
          transform your future and become a proficient full-stack developer.
        </p>

        <div className={styles.highlightedPoints}>
          <div className={styles.highlightedPoint}>
            <p className={styles.point}>
              <FaGraduationCap /> 100% Job guarantee on course completion
            </p>
            <p className={styles.point}>
              {" "}
              <MdFlightClass /> In-class lecture & doubt clearance
            </p>
          </div>
          <div className={styles.highlightedPoint}>
            <p className={styles.point}>
              <SiInternetarchive /> Guaranteed 2-month internship
            </p>
            <p className={styles.point}>
              <GrProjects /> 4+ real-world projects
            </p>
          </div>
          <div className={styles.highlightedPoint}>
            <p className={styles.point}>
              <GiFaceToFace /> 1:1 continuous support
            </p>
            <p className={styles.point}>
              <SiGoogleclassroom /> Open for all disciplines
            </p>
          </div>
        </div>
      </div>
      <div className={styles.syllabusSection}>
        <h3 className={styles.sectionTitle}>Course Syllabus</h3>
      </div>
    </div>
  );
};

export default CourseSyllabus;
