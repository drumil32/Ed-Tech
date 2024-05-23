import React from "react";
import styles from "./styles.module.scss";
import { WhyChooseUs } from "../../../types/types";


const FeaturesCard: React.FC<WhyChooseUs> = ({ title, subtitle, detail }) => {
  return (
    <div className={styles.featureCard}>
      <p>{title}</p>
      <p>{subtitle}</p>
      <p>{detail}</p>
    </div>
  );
};

export default FeaturesCard;
