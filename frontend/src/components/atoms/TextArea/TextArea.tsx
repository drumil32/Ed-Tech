import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import styles from "./style.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  customValidation?: (value: string) => string | null;
  errorMessage?: string | null;
}

const Textarea: React.FC<TextareaProps> = ({ errorMessage, label, required, customValidation, onChange, ...props }) => {

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event);
  };

  useEffect(() => {
    if (textareaRef.current) {
      console.log("from here");
      textareaRef.current.blur();
    } else {
      console.log("to here");
    }

  }, [])

  return (
    <div className={styles.appTextareaContainer}>
      {label && (
        <label>
          {label}
        </label>
      )}
      <div className={styles.textareaBar}>
        <textarea ref={textareaRef} {...props} onChange={handleTextareaChange} className={errorMessage ? `${styles.error}` : ""} />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
