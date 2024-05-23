import React, { useState } from "react";
import './card.scss';
import { WhyChooseUs } from "../../../types/types";


const FeaturesCard: React.FC<WhyChooseUs> = ({ title, subtitle, detail,clipArt,backGroundColor }) => {
  return (

    <div className="page-container">
      <BlogCard title={title} subtitle={subtitle} details={detail} clipArt={clipArt} backGroundColor={backGroundColor}/>
      {/* <footer>
        Image credit: <a href="https://78.media.tumblr.com/d98fb931adb117c70f0dbced9e947520/tumblr_pe582mbWip1tlgv32o1_1280.png">8pxl on Tumblr</a>
      </footer> */}
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

const BlogCard: React.FC<BlogCardProps> = ({ title, subtitle, details,clipArt,backGroundColor }) => {
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
  };

  return (
    <div onClick={flip} onMouseEnter={flip} onMouseLeave={flip} className={`card-container${flipped ? " flipped" : ""}`}>
      <Front title={title} subtitle={subtitle} clipArt={clipArt} backGroundColor={backGroundColor} />
      <Back details={details} />
    </div>
  );
};

interface FrontProps {
  title: string;
  subtitle: string;
  clipArt: string;
  backGroundColor: string;
}

const Front: React.FC<FrontProps> = ({ title, subtitle,clipArt,backGroundColor }) => {
  return (
    <div className="front">
      <ImageArea title={title} subtitle={subtitle} clipArt={clipArt} backGroundColor={backGroundColor} />
      {/* <MainArea /> */}
    </div>
  );
};

interface BackProps {
  details: string;
}

const Back: React.FC<BackProps> = ({ details }) => {
  return (
    <div className="back">
      <p>{details}</p>
    </div>
  );
};

interface ImageAreaProps {
  title: string;
  subtitle: string;
  clipArt: string;
  backGroundColor: string;
}

const ImageArea: React.FC<ImageAreaProps> = ({ title, subtitle,clipArt,backGroundColor }) => {
  return (
    <div className="image-container" style={{ background: backGroundColor }}>
      <img className="card-image" src={clipArt} alt="Blog post" />
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
    </div>
  );
};


export default FeaturesCard;
