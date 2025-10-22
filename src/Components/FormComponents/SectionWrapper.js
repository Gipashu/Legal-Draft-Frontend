import React, { useState } from "react";
import "../CSS/SectionWrapper.css";

const SectionWrapper = ({
  title,
  subtitle,
  children,
  collapsible = false,
  defaultOpen = true,
  highlight = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`section-container ${highlight ? "highlight" : ""}`}>
      <div className="section-header" onClick={() => collapsible && setOpen(!open)}>
        <h2 className="section-title">{title}</h2>
        {collapsible && (
          <button type="button" className="toggle-btn">
            {open ? "−" : "+"}
          </button>
        )}
      </div>

      {subtitle && <p className="section-subtitle">{subtitle}</p>}

      {(!collapsible || open) && <div className="section-body">{children}</div>}
    </div>
  );
};

export default SectionWrapper;
