import React, { useState } from "react";
import './card.scss';
import { WhyChooseUs } from "../../../types/types";

const FeaturesCard: React.FC<WhyChooseUs> = ({ title, subtitle, detail, clipArt, backGroundColor }) => {
  return (
    <div className="page-container">
      <BlogCard
        title={title}
        subtitle={subtitle}
        details={detail}
        clipArt={clipArt}
        backGroundColor={backGroundColor}
      />
    </div>
  );
};

interface BlogCardProps {
  title: string;
  subtitle: string;
  details: string;
  clipArt: string;
  backGroundColor: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, subtitle, details, clipArt, backGroundColor }) => {
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={`card-container${flipped ? " flipped" : ""}`}>
      <Front
        title={title}
        subtitle={subtitle}
        clipArt={clipArt}
        backGroundColor={backGroundColor}
        flip={flip}
      />
      <Back
        details={details}
        flip={flip}
      />
    </div>
  );
};

interface FrontProps {
  flip: () => void;
  title: string;
  subtitle: string;
  clipArt: string;
  backGroundColor: string;
}

const Front: React.FC<FrontProps> = ({ title, subtitle, clipArt, backGroundColor, flip }) => {
  return (
    <div className="front">
      <ImageArea
        title={title}
        subtitle={subtitle}
        clipArt={clipArt}
        backGroundColor={backGroundColor}
        flip={flip}
      />
    </div>
  );
};

interface BackProps {
  details: string;
  flip: () => void;
}

const Back: React.FC<BackProps> = ({ details, flip }) => {
  return (
    <div className="back">
      <p>{details}</p>
      <div style={{ display: "flex", justifyContent: 'flex-end' }}>
        <div className="card-back-btn" onClick={flip}>
          <img
            src="https://assets-global.website-files.com/63e7894221f7cc20e07be64b/63e8f9581eb4ad5b75eaf599_Vector.svg"
            loading="lazy"
            alt="Back arrow"
            className="card-arrow-img"
          />
        </div>
      </div>
    </div>
  );
};

interface ImageAreaProps {
  flip: () => void;
  title: string;
  subtitle: string;
  clipArt: string;
  backGroundColor: string;
}

const ImageArea: React.FC<ImageAreaProps> = ({ title, subtitle, clipArt, backGroundColor, flip }) => {
  return (
    <div className="image-container" style={{ background: backGroundColor }}>
      <img className="card-image" src={clipArt} alt="Blog post" />
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
      <div style={{ justifyContent: 'flex-end', display: 'flex',marginLeft:'' }}>
        <div className="card-flip-btn" onClick={flip}>
          <img
            src="https://assets-global.website-files.com/63e7894221f7cc20e07be64b/63e8f9581eb4ad5b75eaf599_Vector.svg"
            loading="lazy"
            alt="Flip arrow"
            className="card-arrow-img"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;
