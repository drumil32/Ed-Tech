import styles from "../CourseDetails.module.scss";
import { useEffect, useRef, useState } from "react";
import courseModulesDetails from "../../../data/courseModluesDetails.json";
import classNames from "classnames";
import CourseInfoCard from "../CourseInfoCard/CourseInfoCard";
import { SafeHtmlComponent } from "../../../components/molecule/Carausal/Carausal";

const ScrollComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const calculateNewHeight = (height: number) => {
    const subtractionValue = height > 965 ? 50 : 40;
    return height / 2 - subtractionValue;
  };
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = headingRefs.current.indexOf(entry.target as HTMLDivElement);
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: `-${calculateNewHeight(viewportHeight)}px 0px -${calculateNewHeight(viewportHeight)}px 0px`,
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
  }, [viewportHeight]);

  return (
    <div className={styles.container}>
      <div className={styles.headingsContainer}>
        {courseModulesDetails.map((module, index) => {
          const sanitizedHtml = SafeHtmlComponent(module.title as string);
          return (
            <div
              key={index}
              ref={(el) => (headingRefs.current[index] = el)}
              className={classNames(
                styles.heading,
                index === activeIndex && styles.active
              )}
            >
              {sanitizedHtml}
            </div>
          );
        })}
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
            index={activeIndex}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ScrollComponent;
