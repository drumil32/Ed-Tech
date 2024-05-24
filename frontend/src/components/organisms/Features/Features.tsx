import React from "react";
import styles from "./style.module.scss";
import FeaturesCarausal from "../../molecule/FeaturesCarausal/FeaturesCarausal";

const Features: React.FC = () => {
  return (
    <section className={styles.featureSection}>
      <div className={styles.featuresContainer}>
        <h1 className={styles.sectionTitle}>Our programme is curated to maximise real-world learning</h1>
        <FeaturesCarausal />
        <div style={{backgroundColor:"#FFD500",padding:"1rem 3rem",borderRadius:"10px"}}>
          <h3>Know More</h3>
        </div>
      </div>
    </section>
  );
};

export default Features;