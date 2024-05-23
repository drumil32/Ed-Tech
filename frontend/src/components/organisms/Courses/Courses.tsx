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
                     Curriculum
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     1:
                     <span className={styles.ag_courses_item_date}>
                         Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     2:
                     <span className={styles.ag_courses_item_date}>
                     Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     3:
                     <span className={styles.ag_courses_item_date}>
                     Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     4:
                     <span className={styles.ag_courses_item_date}>
                     Logical reasining and DSA.
                     </span>
                 </div>
             </a>
         </div>

         <div className={styles.ag_courses_item}>
             <a href="#" className={styles.ag_courses_item_link}>
                 <div className={styles.ag_courses_item_bg}></div>

                 <div className={styles.ag_courses_item_title}>
                     Curriculum
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     1:
                     <span className={styles.ag_courses_item_date}>
                         Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     2:
                     <span className={styles.ag_courses_item_date}>
                     Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     3:
                     <span className={styles.ag_courses_item_date}>
                     Logical reasining and DSA.
                     </span>
                 </div>
                 <div className={styles.ag_courses_item_date_box}>
                     4:
                     <span className={styles.ag_courses_item_date}>
                     Logical reasining and DSA.
                     </span>
                 </div>
             </a>
         </div>

     </div>
 </div>
 </>
  );
};

export default Courses;
