import React, { InputHTMLAttributes, useState } from "react";
import "./style.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  customValidation?: (value: string) => string | null;
}

const Input: React.FC<InputProps> = ({ label, required, customValidation, onChange, ...props }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (customValidation) {
      const error = customValidation(event.target.value);
      if (error) setErrorMessage(error);
      else setErrorMessage(null);
    }
    if (onChange) onChange(event);
  };

  return (
    <div className={`app-input-container ${props.type || ""}`}>
      {label && (
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input {...props} onChange={handleInputChange} required />
      {props.type === "checkbox" ? (
        <label className="checkbox-label">
          <span className={`checkmark ${props.checked ? "visible" : ""}`}>✔</span>
        </label>
      ) : null}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Input;