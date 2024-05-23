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
  <>
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
    </section>
    <div className={styles.ag_format_container}>
        
     <div className={styles.ag_courses_box}>
         <div className={styles.ag_courses_item}>
             <a href="#" className={styles.ag_courses_item_link}>
                 <div className={styles.ag_courses_item_bg}></div>

                 <div className={styles.ag_courses_item_title}>
                     CURRICULUM
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                         Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     Frontend development with react.js
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     Backend development with node.js
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     4 real-world projects
                     </span>
                 </div>
             </a>
         </div>

         <div className={styles.ag_courses_item}>
             <a href="#" className={styles.ag_courses_item_link}>
                 <div className={styles.ag_courses_item_bg}></div>

                 <div className={styles.ag_courses_item_title}>
                 PLACEMENT
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     2-month internship
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     Job guarantee on course completion
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     At least 4 mock interviews
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     <span className={styles.ag_courses_item_date}>
                     1:1 in-person placement support
                     </span>
                 </div>
             </a>
         </div>

     </div>
    </div>
    <section className={styles.courseHighlights}>
    <h5 className={styles.sectionTitle}>Course Overview</h5>
      <h5>Course Overview</h5>
      <div className={styles.banner}>
      <h1>Join in on Something Big</h1>
      <div className={styles.styles}>
        <p>5 Cr+</p>
        <p>190+</p>
        <p>300 Cr+</p>
      </div>
      <div className={styles.details}>
        <p>Learners</p>
        <p>Countries</p>
        <p>Code submits</p>
      </div>
    </div>

    </section>
 </>
  );
};

export default Courses;
