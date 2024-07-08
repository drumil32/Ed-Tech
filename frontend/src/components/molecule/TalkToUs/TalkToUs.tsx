import React, { useState } from "react";
import styles from "./TalkToUs.module.scss";
import { getRandomIndex } from "../../../utils/utility";
import quotesData from "../../../data/quotes.json";
import upgradeNowSection from "../../../data/upgradeNowSection.json";
import Button from "../../atoms/Button/Button";
import { IoRefresh } from "react-icons/io5";

export interface TalkToUsProps {
  enrolled: boolean;
}

const TalkToUs: React.FC<TalkToUsProps> = ({ enrolled }) => {
  const [randomIndex, setRandomIndex] = useState<number>(
    getRandomIndex(quotesData)
  );

  const changeQuote = () => {
    setRandomIndex(getRandomIndex(quotesData));
  };
  return (
    <>
      {enrolled ? (
        <div className={styles.quoteContainer}>
          <h3>Quote of the Day</h3>
          <p>{quotesData[randomIndex]}</p>
          <Button
            text={<IoRefresh />}
            className={styles.quotesButton}
            onClick={changeQuote}
          />
        </div>
      ) : (
        <div className={styles.upgradeBox}>
          <h3>{upgradeNowSection.title}</h3>
          <p>{upgradeNowSection.Subtitle}</p>
          <Button
            text={upgradeNowSection.CTA}
            className={styles.upgradeButton}
          />
        </div>
      )}
    </>
  );
};

export default TalkToUs;
