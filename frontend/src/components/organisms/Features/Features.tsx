import React from "react";
import styles from "./style.module.scss";
import FeaturesCarausal from "../../molecule/FeaturesCarausal/FeaturesCarausal";

const Features: React.FC = () => {
  return (
    <section className={styles.featureSection}>
      <div className={styles.featuresContainer}>
        <h1 className={styles.sectionTitle}>Why To Choose Us</h1>
        <FeaturesCarausal />
      </div>
    </section>
  );
};

export default Features;
