import React from "react";
import styles from "./style.module.scss";
import CourseListData from "../../../data/courseInfo.json";
import CourseCard from "../../molecule/CourseCard/CourseCard";
import { nanoid } from "nanoid";
import { Course } from "../../../types/types";
import { useMedia } from "react-use";
import CourseCardHorizontal from "../../molecule/CourseCardHorizontal/CourseCardHorizontal";

const Courses: React.FC = () => {
  const isWide = useMedia("(min-width: 1024px)");
  return (
    <section className={styles.courcesContainer} id="courses">
      <h5 className={styles.sectionTitle}>Course Overview</h5>
      <p className={styles.sction_sub_title}><span>Classroom</span> Full-Stack Web Development Program</p>
      <div className={styles.description}>
        <p className={styles.infinite_scroll_text}>
          A tailored offline program, designed to empower you for a successful career in tech.
        </p>
        {/* <p className={styles.infinite_scroll_text2}>
          A tailored offline program, designed to empower you for a successful career in tech.
        </p> */}
       
      </div>
      <div className={styles.cources}>
         {CourseListData.map((course: Course) =>
          isWide ? ( 
            <CourseCardHorizontal {...course} key={nanoid()} />
          ) : ( 
            <CourseCard {...course} key={nanoid()} />
          )
        )}
        
      </div>
    </section>
  );
};

export default Courses;
