import React, { useState } from "react";
import "../CSS/NumberField.css";

const NumberField = ({
  label,
  placeholder = "",
  value = "",
  onChange,
  required = false,
  min,
  max,
  currency = false,
  errorMessage,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let newValue = e.target.value;

    // If currency, strip non-numeric except .
    if (currency) {
      newValue = newValue.replace(/[^0-9.]/g, "");
    }

    // Validation (but allow typing freely)
    if (min !== undefined && newValue !== "" && Number(newValue) < min) {
      setError(errorMessage || `Value should be at least ${min}`);
    } else if (max !== undefined && newValue !== "" && Number(newValue) > max) {
      setError(errorMessage || `Value should not exceed ${max}`);
    } else {
      setError("");
    }

    if (onChange) {
      onChange({
        target: { value: newValue },
      });
    }
  };

  return (
    <div className="field-container">
      <label className="field-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type="text"
        className={`field-input ${error ? "input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default NumberField;
