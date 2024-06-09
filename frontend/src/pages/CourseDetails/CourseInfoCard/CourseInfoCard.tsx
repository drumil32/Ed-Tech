import React from "react";
import styles from "../CourseDetails.module.scss";
import { nanoid } from "nanoid";

export interface CourseInfoCardProps {
  background?: string | null;
  src?: string | null;
  heading?: string | null;
  topics?: string[];
}

const CourseInfoCard: React.FC<CourseInfoCardProps> = ({
  background = "",
  src = "",
  heading = "",
  topics = [],
}) => {
  return (
    <div
      className={styles.card}
      style={{
        background:
          `${background}` || "linear-gradient(320deg, #c078ff 0%, #ffffff 85%)",
      }}
    >
      {src && <img src={src} alt="courses" />}
      <h2>{heading}</h2>
      {topics?.map((topic: string) => (
        <p key={nanoid()}>
          <span>+</span>
          {topic}
        </p>
      ))}
    </div>
  );
};

export default CourseInfoCard;
