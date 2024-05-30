import React from "react";
import styles from "./style.module.scss";

const Courses: React.FC = () => {
  return (
    <>
      <section className={styles.courcesContainer} id="courses">
        <h5 className={styles.sectionTitle}>Course Overview</h5>
        <p className={styles.section_sub_title}>
          <span>In-Classroom </span>
          MERN-Stack Web Development Program
        </p>
        {/* <div className={styles.description}>
          <p className={styles.infinite_scroll_text}>
            A tailored offline program, designed to empower you for a successful
            career in tech.
          </p>
        </div> */}
        <div className={styles.ag_format_container}>
          <div className={styles.ag_courses_box}>
            <div className={styles.ag_courses_item}>
              <div className={styles.ag_courses_item_link}>
                <div className={styles.ag_courses_item_bg}></div>

                <div className={styles.ag_courses_item_title}>CURRICULUM</div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>Logical reasining and DSA
                  </p>
                </div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>Frontend with react.js
                  </p>
                </div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>Backend with node.js
                  </p>
                </div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>4 real-world projects
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.ag_courses_item}>
              <div className={styles.ag_courses_item_link}>
                <div className={styles.ag_courses_item_bg}></div>

                <div className={styles.ag_courses_item_title}>PLACEMENT</div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>2-month internship
                  </p>
                </div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>4+ mock interviews
                  </p>
                </div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>1:1 placement support
                  </p>
                </div>
                <div className={styles.ag_courses_item_date_box}>
                  <p className={styles.ag_courses_item_date}>
                    <span>+ </span>Job guarantee on course completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.courseHighlights__container}>
        <div className={styles.courseHighlights}>
          <h1 className={styles.courseHighlights__tagLine}>
            Build Your Tech Career With Us
          </h1>
          <div className={styles.courseHighlights__points}>
            <div className={styles.courseHighlights__point}>
              <h2 className={styles.title}>8 Months</h2>
              <h4 className={styles.subTitle}>Duration</h4>
            </div>

            <div className={styles.courseHighlights__point}>
                <h2 className={styles.title}>15+ Companies</h2>
                <h4 className={styles.subTitle}>Partners </h4>
              </div>
            <div className={styles.courseHighlights__point}>
                <h2 className={styles.title}>100% assistance</h2>
                <h4 className={styles.subTitle}>Placement</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
