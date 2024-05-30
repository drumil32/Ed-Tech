import React from "react";
import "./card.scss";
import { WhyChooseUs } from "../../../types/types";

const FeaturesCard: React.FC<WhyChooseUs> = (
  { cardDetails, flipedCard, setFlipedCard }
) => {
  return (
    <div className="page-container">
      <BlogCard
        flipedCard={flipedCard}
        setFlipedCard={setFlipedCard}
        cardDetails={cardDetails}
      />
    </div>
  );
};

const BlogCard: React.FC<WhyChooseUs> = ({
  cardDetails: { title, subtitle, detail, clipArt, backGroundColor, id }, flipedCard, setFlipedCard
}) => {

  const flip = () => {
    setFlipedCard(prevState => prevState == id ? '' : id);
  };

  return (
    <div className={`card-container${flipedCard == id ? " flipped" : ""}`} onClick={flip}>
      <Front
        title={title}
        subtitle={subtitle}
        clipArt={clipArt}
        backGroundColor={backGroundColor}
        flip={flip}
      />
      <Back detail={detail} flip={flip} />
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

const Front: React.FC<FrontProps> = ({
  title,
  subtitle,
  clipArt,
  backGroundColor,
  flip,
}) => {
  return (
    <div className="front" style={{ background: backGroundColor }}>
      <ImageArea
        title={title}
        subtitle={subtitle}
        clipArt={clipArt}
        flip={flip}
      />
    </div>
  );
};

interface BackProps {
  detail: string;
  flip: () => void;
}

const Back: React.FC<BackProps> = ({ detail, flip }) => {
  return (
    <div className="back">
      <p>{detail}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
}

const ImageArea: React.FC<ImageAreaProps> = ({
  title,
  subtitle,
  clipArt,
  flip,
}) => {
  return (
    <div className="image-container">
      <img className="card-image" src={clipArt} alt="Blog post" />
      <div className="front-content">
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">{subtitle}</h2>
      </div>
      <div
        style={{ justifyContent: "flex-end", display: "flex", marginLeft: "" }}
      >
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
