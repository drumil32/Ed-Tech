import React, { useEffect, useRef, useState } from "react";
import styles from "./CourseDetails.module.scss";
import courseModulesDetails from "../../data/courseModluesDetails.json";
import { nanoid } from "nanoid";
import classNames from "classnames";
import module2 from "../../assets/images/courses/Module 2.svg";

const CourseDetails: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { innerHeight: height } = window;
  const newHeight = height / 2 - 70;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = headingRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            setActiveIndex(index);
            console.log(courseModulesDetails[index]);
          }
        });
      },
      {
        threshold: 0.1, // Adjusted threshold to a lower value
        rootMargin: `-${newHeight}px 0px -${newHeight}px 0px`,
      }
    );

    headingRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      headingRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [newHeight]);

  return (
    <div className={styles.container}>
      
      <div className={styles.headingsContainer}>
        {courseModulesDetails.map((module, index) => (
          <div
            key={index}
            ref={(el) => (headingRefs.current[index] = el)}
            className={classNames(
              styles.heading,
              index === activeIndex && styles.active
            )}
          >
            {module.title}
          </div>
        ))}
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card} style={{ background: "linear-gradient(320deg, #619cfa 0%, #eaf5fa 100%)" }}>
          {activeIndex !== null &&
          activeIndex > 0 &&
          activeIndex < courseModulesDetails.length - 1 ? (
            <>
            <img src={module2} alt="courses" />
              <h2>{courseModulesDetails[activeIndex].heading}</h2>
              {courseModulesDetails[activeIndex].topics?.map((topic) => (
                <p key={nanoid()}>+ {topic}</p>
              ))}
              
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
