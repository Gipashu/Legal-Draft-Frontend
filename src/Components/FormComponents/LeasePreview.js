// LeasePreview.jsx
import React, { useState } from "react";
import "../CSS/LeasePreview.css";
import LeaseLoader from "../FormComponents/LoaderComponent"; // <-- global loader
import DownloadButton from "../FormComponents/DownloadButton";
import { useLeaseSubmit } from "../../hooks/useLeaseSubmit";

const LeasePreview = ({ formType, onEdit }) => {
  const [format, setFormat] = useState("pdf");

  // Use Redux hook
  const { handleSubmit, formData, status, error } = useLeaseSubmit(formType);
  // console.log("DEBUG formData:", formData);

  // Show global loader when pending
  if (status === "loading") {
    const randomDuration = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000; // 3–7s
    return (
      <LeaseLoader
        message="AI is generating your lease document..."
        duration={randomDuration}
      />
    );
  }

  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="lease-preview">
        <h2>Preview Lease Agreement</h2>
        <p>No data to preview. Please fill out the form first.</p>
        <button onClick={onEdit} className="btn-edit">
          Go Back & Edit
        </button>
      </div>
    );
  }

  return (
    <div className="lease-preview">
      <h2>Preview {formType} Lease Agreement</h2>

      {/* Data grid */}
      <div className="preview-grid">
        {Object.entries(formData).map(([field, value]) => (
          <div key={field} className="preview-row">
            <strong>{field.replace(/([A-Z])/g, " $1")}:</strong>{" "}
            {typeof value === "object" ? JSON.stringify(value) : String(value)}
          </div>
        ))}
      </div>

      {/* File format choice */}
      <div className="format-choice">
        <label>
          <input
            type="radio"
            value="pdf"
            checked={format === "pdf"}
            onChange={(e) => setFormat(e.target.value)}
          />{" "}
          PDF
        </label>
        <label>
          <input
            type="radio"
            value="docx"
            checked={format === "docx"}
            onChange={(e) => setFormat(e.target.value)}
          />{" "}
          DOCX
        </label>
      </div>

      {/* Actions */}
      <div className="preview-actions">
        <button onClick={onEdit} className="btn-edit">
          Go Back & Edit
        </button>

        {/* Confirm & Save */}
        <button
          onClick={() => handleSubmit(format)}
          className="btn-confirm"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Submitting..."
            : `Confirm & Save (${format.toUpperCase()})`}
        </button>

        {/* Download using hook (global loader shown) */}
        <DownloadButton
          formType={formType}
          formData={formData}
          format={format}
          filename={`${formType}-lease`}
          label={`Download ${format.toUpperCase()}`}
          onDownload={handleSubmit} // 🔑 integrate with hook
        />
      </div>

      {status === "failed" && (
        <p className="error-text">
          Error:{" "}
          {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
        </p>
      )}
    </div>
  );
};

export default LeasePreview;
