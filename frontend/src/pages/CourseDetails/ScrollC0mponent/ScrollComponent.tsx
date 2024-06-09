import styles from "../CourseDetails.module.scss";
import { useEffect, useRef, useState } from "react";
import courseModulesDetails from "../../../data/courseModluesDetails.json";
import classNames from "classnames";
import CourseInfoCard from "../CourseInfoCard/CourseInfoCard";

const ScrollComponent: React.FC = () => {
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
        threshold: 0.05,
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
      <div className={styles.infoCardContainer}>
        {activeIndex !== null &&
        activeIndex >= 0 &&
        activeIndex <= courseModulesDetails.length - 1 ? (
          <CourseInfoCard
            background={courseModulesDetails[activeIndex].background}
            src={courseModulesDetails[activeIndex]?.src}
            heading={courseModulesDetails[activeIndex].heading}
            topics={courseModulesDetails[activeIndex].topics}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ScrollComponent;
