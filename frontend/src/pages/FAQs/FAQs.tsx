import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axiosInstance from "../../utils/axiosInstance";
import restEndPoints from "../../data/restEndPoints.json";
import { toast } from "react-toastify";
import { FAQ, FAQItem, FAQType } from "../../types/types";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
import { MdExpandMore } from "react-icons/md";
import classNames from "classnames";
import Select, { SingleValue } from "react-select";

const FAQs: React.FC = () => {
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [faqType, setFaqType] = useState<FAQType>(FAQType.Program);

  const options = [
    { value: FAQType.Program, label: "Program" },
    { value: FAQType.Curriculum, label: "Curriculum" },
    { value: FAQType.Teaching, label: "Teaching" },
    { value: FAQType.EntranceTest, label: "Entrance Test" },
    { value: FAQType.Mentors, label: "Mentors" },
    { value: FAQType.PlacementSupport, label: "Placement Support" },
    { value: FAQType.EntranceFees, label: "Entrance Fees" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${restEndPoints.getFaqByType}/${faqType}`
        );
        setFaq(response.data.faqDoc);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    };
    fetchData();
  }, [faqType]);

  const handleClick = (item: FAQType) => {
    setFaqType(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSelectChange = (
    selectedOption: SingleValue<{ value: FAQType; label: string }>
  ) => {
    if (selectedOption) {
      setFaqType(selectedOption.value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className={styles.faqSection}>
      <div className={styles.sidebar}>
        <ul className={styles.catagories}>
          {Object.values(FAQType).map((item) => (
            <li
              className={classNames(
                styles.catagory,
                item === faqType && styles.active
              )}
              key={nanoid()}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.faqs}>
        <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
        <div className={styles.categoryHeader}>
          <h2 className={styles.faqType}>{faq?.type}</h2>
          <div className={styles.select}>
            <Select
              options={options}
              onChange={handleSelectChange}
              placeholder="Category"
              isSearchable={false}
              value={options.find((option) => option.value === faqType)}
            />
          </div>
        </div>
        {faq && faq.faq?.length > 0 ? (
          <div className={styles.faqsContainer}>
            {faq.faq.map((faqItem: FAQItem) => (
              <FaqElement faqItem={faqItem} key={nanoid()} />
            ))}
          </div>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </div>
  );
};

const FaqElement: React.FC<{ faqItem: FAQItem }> = ({ faqItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleLesson = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.faqContainer}>
      <h3
        className={`${styles.faqQuestion} ${isExpanded ? styles.expanded : ""}`}
        onClick={toggleLesson}
      >
        {faqItem.question}
        <span className={styles.expandIcon}>
          <MdExpandMore />
        </span>
      </h3>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.content}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {(faqItem?.startingParagraphs || [])?.length > 0 ? (
              <div className={styles.startingPara}>
                {faqItem.startingParagraphs.map((item) => (
                  <p key={nanoid()}>{item}</p>
                ))}
              </div>
            ) : null}

            {faqItem.pointerTitle ? (
              <p className={styles.pointerTitle}>{faqItem.pointerTitle}</p>
            ) : null}

            {(faqItem.pointers || [])?.length > 0 ? (
              <ul className={styles.pointers}>
                {faqItem.pointers.map((item) => (
                  <li key={nanoid()}>{item}</li>
                ))}
              </ul>
            ) : null}

            {(faqItem?.endingParagraphs || [])?.length > 0 ? (
              <div className={styles.endingPara}>
                {faqItem.endingParagraphs.map((item) => (
                  <p key={nanoid()}>{item}</p>
                ))}
              </div>
            ) : null}

            {faqItem.endingLine ? (
              <p className={styles.endingLine}>{faqItem.endingLine}</p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQs;
