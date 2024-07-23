import React, { useState } from "react";
import { nanoid } from "nanoid";
import FAQsList from "../../data/faqs.json";
import { Faqs } from "../../types/types";
import styles from "./styles.module.scss";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion } from "framer-motion";
// import axiosInstance from "../../utils/axiosInstance";
// import restEndPoints from "../../data/restEndPoints.json";
// import { toast } from "react-toastify";

const FAQs: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // const [faq, setFaq] = useState<FAQ | null>(null);
  // const [faqType, setFaqType] = useState(FAQType.Program);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get(`${restEndPoints.getFaqByType}/${faqType}`);
  //       console.log(response);
  //       setFaq(response.data.faqDoc);
  //     } catch (error: any) {
  //       toast.error(error.response.data.error);
  //     }
  //   };
  //   fetchData();
  // }, [faqType]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };



  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.pageTitle}>Frequently Asked Questions</h2>
      {FAQsList.map((faq: Faqs, index: number) => (
        <div key={nanoid()} className={styles.accordionItem}>
          <div
            className={styles.accordionHeader}
            onClick={() => toggleAccordion(index)}
          >
            <p>{faq.question}</p>
            <div className={styles.accordianIcon}>
              {expandedIndex === index ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {expandedIndex === index && (
            <motion.div
              className={styles.accordionContent}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>{faq.answer}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
