import React from "react";
import "./style.scss";
import Hero from "../../components/organisms/Hero/Hero";
import Courses from "../../components/organisms/Courses/Courses";
import Features from "../../components/organisms/Features/Features";
import AboutUs from "../../components/organisms/AboutUs/AboutUs";
import BookLiveClassForm from "../../components/organisms/BookLiveClass/BookLiveClass";
import { BsWhatsapp } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  // useEffect(()=>{
  if (!location.state && user) {
    // navigate('/dashboard');
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  // },[user])

  return (
    <div className="home">
      <Hero />
      <Courses />
      <Features />
      <AboutUs />
      <BookLiveClassForm />
      <a
        className="whatsapp-icon"
        href="https://wa.me/9033107408
"
        target="_blank"
      >
        <BsWhatsapp />
      </a>
    </div>
  );
};

export default Home;
