import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
import Sidebar from "../organisms/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";
import DashboardHeader from "../organisms/Header/DashboardHeader.tsx/DashboardHeader";

const DashboardLayout: React.FC = () => {
  return (
    <>
      <DashboardHeader />
      <div className={styles.mainContainer}>
        <main className={styles.main}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
