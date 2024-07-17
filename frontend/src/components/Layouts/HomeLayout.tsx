import React, { useEffect } from "react";
import Header from "../organisms/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../organisms/Footer/Footer";
// import { useMedia } from "react-use";
import "./HomeLayout.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-creative";
import "swiper/scss/autoplay";
import { Autoplay } from "swiper/modules";

const HomeLayout: React.FC = () => {
  // const isMobile = useMedia("(max-width: 575px)");
  const location = useLocation().pathname;

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <div className="header-highlight">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          loop={true}
        >
          <SwiperSlide>
            <p>Lucknow’s top offline MERN Full-Stack program 💻</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>New batches starting in August & September 🚀</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>Hurry, Limited seats & scholarships available ⏰</p>
          </SwiperSlide>
        </Swiper>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
