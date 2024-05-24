import React from "react";
import { WhyChooseUs } from "../../../types/types";
import { nanoid } from "nanoid";
import FeaturesCard from "../FeaturesCard/FeaturesCard";
import WhyChooseUsListData from "../../../data/whyChooseUsInfo.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

const FeaturesCarausal: React.FC = () => {
  return (
    <div className="features">
      {WhyChooseUsListData.map((whyChooseUs: WhyChooseUs) => (
        <FeaturesCard {...whyChooseUs} key={nanoid()} />
      ))}
    </div>
  );
};

export default FeaturesCarausal;
