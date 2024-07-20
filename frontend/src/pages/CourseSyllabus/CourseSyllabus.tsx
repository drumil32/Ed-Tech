import React, { useEffect } from "react";
import styles from "./CourseSyllabus.module.scss";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import restEndPoints from "../../data/restEndPoints.json";
import { eventAxiosInstance } from "../../utils/axiosInstance";
import { EventType } from "../../types/types";

const CourseSyllabus: React.FC = () => {
  useEffect(() => {
    eventAxiosInstance.post(restEndPoints.event, { type: EventType.COURSE_SYLLABUS_VIEW });
  }, [])
  return (
    <div className={styles.courseSyllabus}>
      <SidebarTriggerButton />
      <div className={styles.pageDetails}>
        <h5 className={styles.subject}>Job Path</h5>
        <h2 className={styles.title}>In-Classroom MERN Full-Stack Web Development Course</h2>
      </div>
    </div>
  )
};

export default CourseSyllabus;
