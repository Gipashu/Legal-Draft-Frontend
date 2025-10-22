import React, { useState } from "react";
import "../CSS/DateField.css";

const DateField = ({ label, value, onChange, name, required = false, disablePast = false, min, max }) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;

    const today = new Date().toISOString().split("T")[0];

    // Soft validation for dates
    if (disablePast && newValue < today) {
      setError("Date cannot be in the past");
    } else if (min && newValue < min) {
      setError(`Date cannot be before ${min}`);
    } else if (max && newValue > max) {
      setError(`Date cannot be after ${max}`);
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
        type="date"
        id={name}
        name={name}
        className={`field-input ${error ? "input-error" : ""}`}
        value={value}
        onChange={handleChange}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default DateField;
