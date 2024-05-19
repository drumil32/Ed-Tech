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
    <section className={styles.courcesContainer}>
      <h1 className={styles.sectionTitle}>Programs We Offer</h1>
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
