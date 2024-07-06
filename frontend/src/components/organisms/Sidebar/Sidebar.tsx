import styles from "./Sidebar.module.scss";
import { MdOutlineDashboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Button from "../../atoms/Button/Button";

const Sidebar = () => {
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
      <div className={styles.upgradeBox}>
        <h3>Upgrade your plan</h3>
        <p>
          Go deeper and learn job-ready skills. Practice with real-world
          projects, take assessments, and earn certificates.
        </p>
        <Button text="Upgrade plan" className={styles.upgradeButton} />
      </div>
    </div>
  );
};

export default Sidebar;
