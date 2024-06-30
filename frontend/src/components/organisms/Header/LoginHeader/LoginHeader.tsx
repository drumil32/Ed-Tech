import React from "react";
import MobileNavbar from "../MobileNavbar";
import { Link, useLocation } from "react-router-dom";
import logo from "/assets/logo.svg";
import styles from "./LoginHeader.module.scss";

const LoginHeader: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.loginHeader}>
          <div className={styles.loginHeader_logo}>
            <MobileNavbar />
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="" />
              <h2>SprintUp</h2>
            </Link>
          </div>
          <div className={styles.loginHeader_btns}>
            {pathName === "/signup" ? (
              <Link to="/login" className={styles.loginHeader_btn}>
                Login
              </Link>
            ) : null}
            {pathName === "/login" ? (
              <Link to="/signup" className={styles.loginHeader_btn}>
                Signup
              </Link>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default LoginHeader;
