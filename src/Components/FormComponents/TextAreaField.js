import React, { useState } from "react";
import "../CSS/TextAreaField.css";

const TextAreaField = ({
  label,
  name,
  placeholder = "",
  value = "",
  onChange,
  required = false,
  minLength,
  maxLength,
  showCounter = true,
  autoResize = false,
  errorMessage,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let newValue = e.target.value;

    // Min/Max length validation
    if (minLength && newValue.length < minLength) {
      setError(errorMessage || `Must be at least ${minLength} characters`);
    } else if (maxLength && newValue.length > maxLength) {
      setError(errorMessage || `Must be under ${maxLength} characters`);
    } else {
      setError("");
    }

    if (autoResize) {
      e.target.style.height = "auto"; // reset first
      e.target.style.height = e.target.scrollHeight + "px";
    }

    if (onChange) {
      onChange({
        target: { name, value: newValue },
      });
    }
  };

  return (
    <div className="field-container">
      <label className="field-label" htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        className={`field-textarea ${error ? "input-error" : ""}`}
        rows="4"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
      {showCounter && maxLength && (
        <div className="char-counter">
          {value?.length || 0}/{maxLength}
        </div>
      )}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default TextAreaField;
