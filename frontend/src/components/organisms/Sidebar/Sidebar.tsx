import styles from "./Sidebar.module.scss";
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import upgradeNowSection from "../../../data/upgradeNowSection.json";
import quotesData from "../../../data/quotes.json";
import { getRandomIndex } from "../../../utils/utility";
import React from "react";

const Sidebar: React.FC = () => {
  const user = {
    enrolled: false,
  };

  const randomIndex = getRandomIndex(quotesData);

  return (
    <div className={styles.sidebar}>
      <ul className={styles.navigations}>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <MdOutlineDashboard />
            My Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/course-syllabus"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <GoTasklist />
            Course Syllabus
          </NavLink>
        </li>
        <li>
          <NavLink
            to=""
            className={styles.disable}
            onClick={(e) => e.preventDefault()}
          >
            <RiGitRepositoryLine />
            Lecture Repository
          </NavLink>
        </li>
      </ul>
      {user.enrolled ? (
        <div className={styles.quoteContainer}>
          <h3>Quote of the Day</h3>
          <p>{quotesData[randomIndex]}</p>
        </div>
      ) : (
        <div className={styles.upgradeBox}>
          <h3>{upgradeNowSection.title}</h3>
          <p>{upgradeNowSection.Subtitle}</p>
          <Button
            text={upgradeNowSection.CTA}
            className={styles.upgradeButton}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
