import React, { TextareaHTMLAttributes, useState } from "react";
import styles from "./style.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  customValidation?: (value: string) => string | null;
}

const Textarea: React.FC<TextareaProps> = ({ label, required, customValidation, onChange, ...props }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (customValidation) {
      const error = customValidation(event.target.value);
      if (error) setErrorMessage(error);
      else setErrorMessage(null);
    }
    if (onChange) onChange(event);
  };

  return (
    <div className={styles.appTextareaContainer}>
      {label && (
        <label>
          {label}
        </label>
      )}
      <div className={styles.textareaBar}>
        <textarea {...props} onChange={handleTextareaChange} required />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default Textarea;
