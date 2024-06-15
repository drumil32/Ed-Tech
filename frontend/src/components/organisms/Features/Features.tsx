import React from "react";
import styles from "./style.module.scss";
import FeaturesCarausal from "../../molecule/FeaturesCarausal/FeaturesCarausal";
import { useMedia } from "react-use";
import { Link } from "react-router-dom";

const Features: React.FC = () => {
  const isTablet = useMedia("(max-width: 1145px)");
  return (
    <section className={styles.featureSection}>
      <div className={styles.featuresContainer}>
        <h5 className={styles.sectionHeading}>Why choose us?</h5>
        <h1 className={styles.sectionTitle}>
          Our Program Maximises
          {!isTablet ? (
            <span> Real-World Learning</span>
          ) : (
            <>
              <br />
              <span>Real-World Learning</span>
            </>
          )}
        </h1>

        <FeaturesCarausal />
        <Link to="/course-details" style={{color: "#000"}}>
        <div
        className={styles.exploreButton}
        >
          <h3>Know More</h3>
        </div>
        </Link>
      </div>
    </section>
  );
};

export default Features;
