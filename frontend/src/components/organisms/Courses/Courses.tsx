import React from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { TfiBook } from "react-icons/tfi";

const Courses: React.FC = () => {
  return (
    <>
      <section className={styles.courcesSection} id="courses">
        <div className={styles.courcesContainer}>
          <h5 className={styles.sectionTitle}>Course Overview</h5>
          <p className={styles.section_sub_title}>
            <span>In-Classroom </span>
            MERN Full-Stack Web Development Course
          </p>
          {/* <div className={styles.ag_format_container}>
            <div className={styles.ag_courses_box}>
              <div className={styles.ag_courses_item}>
                <div className={styles.ag_courses_item_link}>
                  <div className={styles.ag_courses_item_bg}></div>

                  <div className={styles.ag_courses_item_title}>CURRICULUM</div>
                  <div className={styles.ag_courses_item_date_box}>
                    <p className={styles.ag_courses_item_date}>
                      <span>+ </span>Logical reasoning and DSA
                    </p>
                  </div>
                  <div className={styles.ag_courses_item_date_box}>
                    <p className={styles.ag_courses_item_date}>
                      <span>+ </span>Frontend with React.js
                    </p>
                  </div>
                  <div className={styles.ag_courses_item_date_box}>
                    <p className={styles.ag_courses_item_date}>
                      <span>+ </span>Backend with Node.js
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
          </div> */}
          <div className={styles.courseCardContainer}>
            <div className={styles.availableCoursesCard}>
              <div className={styles.cardHeader}>Job Path</div>
              <div className={styles.content}>
                <h2 className={styles.cardHeading}>Curriculum</h2>
                <p className={styles.cardDesc}>
                  Our curriculum emphasizes foundational skills that will equip
                  you for a lifetime of success and adaptability in your career.
                </p>
                <div className={styles.bulletPointsBox}>
                  <p className={styles.bulletPoint}>
                    <span>+ </span>Logical reasoning and DSA
                  </p>
                  <p className={styles.bulletPoint}>
                    <span>+ </span>Frontend with React.js
                  </p>
                  <p className={styles.bulletPoint}>
                    <span>+ </span>Backend with Node.js
                  </p>
                  <p className={styles.bulletPoint}>
                    <span>+ </span>4 real-world projects
                  </p>
                </div>
                <div className={styles.cardPointsContainer}>
                  <h5 className={styles.cardPoints}>
                    <TfiBook /> Open to all disciplines
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <NavLink to="/course-details" style={{ color: "#000" }}>
            <div className={styles.exploreButton}>
              <h3>Know More</h3>
            </div>
          </NavLink>
        </div>
      </section>
      <section className={styles.courseHighlights__container}>
        <div className={styles.courseHighlights}>
          <h1 className={styles.courseHighlights__tagLine}>
            {/* Build Your Tech Career With Us */}
            We'll Find The Right Job For You
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
              <h2 className={styles.title}>100% Placement</h2>
              <h4 className={styles.subTitle}>Guarantee</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
