import React, { useEffect, useState } from "react";
import styles from "./CourseSyllabus.module.scss";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import restEndPoints from "../../data/restEndPoints.json";
import axiosInstance, { eventAxiosInstance } from "../../utils/axiosInstance";
import { EventType } from "../../types/types";
import { FaGraduationCap } from "react-icons/fa6";
import { MdFlightClass } from "react-icons/md";
import { SiInternetarchive, SiGoogleclassroom } from "react-icons/si";
import { GrProjects } from "react-icons/gr";
import { GiFaceToFace } from "react-icons/gi";
import { nanoid } from "nanoid";

type Topic = {
  title: string;
  description: string;
  isLocked: string;
};

type Module = {
  title: string;
  description: string;
  topics: Topic[];
};

type Course = {
  title: string;
  modules: Module[];
};

const CourseSyllabus: React.FC = () => {
  const [moduleData, setModuleData] = useState<Course[]>([]);
  useEffect(() => {
    eventAxiosInstance.post(restEndPoints.event, {
      type: EventType.COURSE_SYLLABUS_VIEW,
    });
    fetchModuleData();
  }, []);

  const fetchModuleData = async () => {
    try {
      const response = await axiosInstance.get(restEndPoints.course);
      setModuleData(response.data.sections);
    } catch (err) {
      console.log(err);
    }
  };
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
        {moduleData?.length > 0
          ? moduleData.map((module) => {
            console.log(module);
              return (
                <div className={styles.moduleContainer} key={nanoid()}></div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default CourseSyllabus;
