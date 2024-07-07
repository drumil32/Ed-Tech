import React from "react";
import styles from "./Progress.module.scss";

export interface ProgreessProps {
  progress: number;
}

const Progress: React.FC<ProgreessProps> = ({ progress }) => {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progress}
        style={{
          width: `${progress}%`,
          borderRight: progress === 0 ? "none" : "1px solid #000",
        }}
      ></div>
      <span>{progress}%</span>
    </div>
  );
};

export default Progress;
