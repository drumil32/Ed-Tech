import React, { useEffect } from "react";
import Header from "../organisms/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";

const HomeLayout: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, [useLocation().pathname]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
