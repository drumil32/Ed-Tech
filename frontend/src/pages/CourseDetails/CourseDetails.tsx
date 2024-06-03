import React, { useEffect, useRef, useState } from "react";
import styles from "./CourseDetails.module.scss";
import courseMoudluesDetails from "../../data/courseMoudluesDetails.json";
import { nanoid } from "nanoid";
import classNames from "classnames";

const CourseDetails: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const helper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = headingRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            setActiveIndex(index);
            console.log(courseMoudluesDetails[index]);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-250px 0px -250px 0px",
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
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headingsContainer}>
          {courseMoudluesDetails.map((module, index) => (
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
        <div
          style={{
            border: "1px solid black",
            height: "100px",
            width: "400px",
            position: "sticky",
            bottom: "50%",
            transform: "translateY(-50%)",
            left: "100%",
          }}
          ref={helper}
        >
          {activeIndex && activeIndex > 0 && activeIndex < 9 ? (
            <>
              {courseMoudluesDetails[activeIndex].heading}
              {courseMoudluesDetails[activeIndex].topics?.map((topic) => (
                <p key={nanoid()}>+ {topic}</p>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
