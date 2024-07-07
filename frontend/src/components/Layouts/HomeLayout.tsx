import React, { useEffect } from "react";
import Header from "../organisms/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
import { useMedia } from "react-use";
import "./HomeLayout.scss";

const HomeLayout: React.FC = () => {
  const isMobile = useMedia("(max-width: 575px)");
  const location  = useLocation().pathname
  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);
  return (
    <>
      <Header />
      <div className="header-highlight">
        {isMobile ? (
          <>
            <p>Lucknow's top offline MERN full-stack program.</p>
            <p>Hurry, limited seats only! ⏰</p>
          </>
        ) : (
          <p>
            Lucknow's top offline MERN full-stack program. Hurry, limited seats
            only! ⏰
          </p>
        )}
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
