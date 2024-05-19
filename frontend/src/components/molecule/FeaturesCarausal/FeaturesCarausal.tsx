import React from "react";
import { WhyChooseUs } from "../../../types/types";
import { nanoid } from "nanoid";
import FeaturesCard from "../FeaturesCard/FeaturesCard";
import WhyChooseUsListData from "../../../data/whyChooseUsInfo.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

const FeaturesCarausal: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="features">
      <Slider {...settings}>
        {WhyChooseUsListData.map((whyChooseUs: WhyChooseUs) => (
          <FeaturesCard {...whyChooseUs} key={nanoid()} />
        ))}
      </Slider>
    </div>
  );
};

export default FeaturesCarausal;
