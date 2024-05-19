import React from "react";
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  description: string;
  detail: string;
}

const FeaturesCard: React.FC<CardProps> = ({ title, description, detail }) => {
  return (
    <div className={styles.featureCard}>
      <p>{title}</p>
      <p>{description}</p>
      <p>{detail}</p>
    </div>
  );
};

export default FeaturesCard;
