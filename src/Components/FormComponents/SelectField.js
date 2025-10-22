import React, { useState } from "react";
import "../CSS/SelectField.css";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  placeholder = "Select an option",
  allowEmpty = true,
  multiple = false,
  errorMessage,
}) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const newValue = multiple
      ? Array.from(e.target.selectedOptions, (opt) => opt.value)
      : e.target.value;

    if (required && (!newValue || (Array.isArray(newValue) && newValue.length === 0))) {
      setError(errorMessage || "This field is required");
    } else {
      setError("");
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
      <select
        id={name}
        name={name}
        className={`field-input select ${error ? "input-error" : ""}`}
        value={value}
        onChange={handleChange}
        required={required}
        multiple={multiple}
      >
        {allowEmpty && !multiple && (
          <option value="">{placeholder}</option>
        )}
        {options.map((o, idx) => (
          <option
            key={o.value || idx}
            value={o.value || o}
            disabled={o.disabled}
          >
            {o.label || o}
          </option>
        ))}
      </select>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default SelectField;
