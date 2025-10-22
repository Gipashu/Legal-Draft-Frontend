import React, { useState } from "react";
import "../CSS/TextInputField.css";

const TextInputField = ({
  label,
  name,
  placeholder = "",
  value = "",
  onChange,
  type = "text",
  required = false,
  minLength,
  maxLength,
  pattern,
  errorMessage,
  onlyLetters = false,
  onlyNumbers = false,
  capitalize = false,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let newValue = e.target.value;

    // Transformations
    if (onlyLetters) newValue = newValue.replace(/[^a-zA-Z\s]/g, "");
    if (onlyNumbers) newValue = newValue.replace(/[^0-9]/g, "");
    if (capitalize) newValue = newValue.toUpperCase();

    // Soft validation
    if (minLength && newValue.length < minLength && newValue !== "") {
      setError(errorMessage || `Must be at least ${minLength} characters`);
    } else if (maxLength && newValue.length > maxLength) {
      setError(errorMessage || `Must be under ${maxLength} characters`);
    } else if (pattern && !new RegExp(pattern).test(newValue) && newValue !== "") {
      setError(errorMessage || "Invalid format");
    } else {
      setError("");
    }

    if (onChange) onChange({ target: { name, value: newValue } });
  };

  return (
    <div className="field-container">
      <label className="field-label" htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`field-input ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default TextInputField;
