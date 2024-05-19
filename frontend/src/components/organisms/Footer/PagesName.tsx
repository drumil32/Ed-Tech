import React from "react";
import "./style.scss";
import {nanoid} from "nanoid";

const PagesName: React.FC = () => {

  const pages: string[] = ["Home", "About Us", "Our Work", "Blogs"];

  return (
    <div className="pagesContainer">
      <ul>
        {
          pages.map((item) => (
            <li key={nanoid()}>{item}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default PagesName;