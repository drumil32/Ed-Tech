import styles from "./Dashboard.module.scss";
import marketingBannerDetails from "../../data/marketingBannerDetails.json";
import React, { useState } from "react";
import Progress from "../../components/atoms/ProgressBar/Progress";
import { Link } from "react-router-dom";
import Button from "../../components/atoms/Button/Button";
import TalkToUs from "../../components/molecule/TalkToUs/TalkToUs";
import SidebarTriggerButton from "../../components/atoms/SidebarTriggerButton/SidebarTriggerButton";
import { Modal } from "../../components/atoms/Modal/Modal";
import { IoCloseCircle } from "react-icons/io5";

const Dashboard: React.FC = () => {
  const user = {
    enrolled: false,
    progress: 30,
  };
  const [talkToUsModalOpen, setTalkToUsModalOpen] = useState<boolean>(false);
  return (
    <div className={styles.dashboard}>
      {talkToUsModalOpen && (
        <Modal className={styles.talkToUsModal}>
          <div>
            <div onClick={() => setTalkToUsModalOpen(false)} className={styles.closeBtn}>
              <IoCloseCircle />
            </div>
          </div>
        </Modal>
      )}
      <SidebarTriggerButton />
      <div
        className={styles.marketingBanner}
        style={{
          backgroundColor: user.enrolled
            ? marketingBannerDetails.enrolled.Subtitle
            : marketingBannerDetails.guest.Subtitle,
        }}
      >
        <div className={styles.content}>
          <h2>
            {user.enrolled
              ? marketingBannerDetails.enrolled.Title
              : marketingBannerDetails.guest.Title}
          </h2>
          <p>
            {user.enrolled
              ? marketingBannerDetails.enrolled.Subtitle
              : marketingBannerDetails.guest.Subtitle}
          </p>
        </div>
        <div className={styles.bannerImage}>
          <img
            src={
              user.enrolled
                ? marketingBannerDetails.enrolled.clipArt
                : marketingBannerDetails.guest.clipArt
            }
            alt="banner"
          />
        </div>
      </div>
      <div className={styles.learningSection}>
        <h2 className={styles.sectionTitle}>
          {user.enrolled
            ? user.progress === 0
              ? "Start Learning"
              : "Keep Learning"
            : "Start Learning"}
        </h2>
        <div className={styles.learningContainer}>
          <Progress progress={user.progress} />
          <div className={styles.learningContent}>
            <h3>Job Path</h3>
            <p> In-Classroom MERN Full-Stack Web Development Course</p>
          </div>
          <div className={styles.learningCtaContainer}>
            <Link to="/course-syllabus">View Syllabus</Link>
            <Link to="/course-syllabus">
              {user.enrolled
                ? user.progress === 0
                  ? "Start Now"
                  : "Resume"
                : "Start Course"}
            </Link>
          </div>
        </div>
      </div>

      {!user.enrolled ? (
        <div className={styles.availableCoursesSection}>
          <h2 className={styles.sectionTitle}>Available Courses</h2>
          <div className={styles.availableCoursesContainer}>
            <div className={styles.availableCoursesCard}>
              <img src="/assets/dashboard/card1.svg" alt="" />
              <h2>Not sure where to start?</h2>
              <p>Connect with us to take a short career counselling session.</p>
              <Button
                text="Talk to us!"
                onClick={() => setTalkToUsModalOpen(true)}
                className={styles.availableCoursesCardCta}
              />
            </div>
            <div className={styles.availableCoursesCard}>
              <img src="/assets/dashboard/card1.svg" alt="" />
              <h2>Not sure where to start?</h2>
              <p>Connect with us to take a short career counselling session.</p>
              <Button
                text="Talk to us!"
                className={styles.availableCoursesCardCta}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.talkToUsSection}>
        <div className={styles.talkToUsContainer}>
          <TalkToUs enrolled={user.enrolled} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
