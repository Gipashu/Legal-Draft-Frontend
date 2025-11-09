// LeasePreview.jsx
import React, { useState, useEffect } from "react";
import "../CSS/LeasePreview.css";
import LeaseLoader from "../FormComponents/LoaderComponent";
import DownloadButton from "../FormComponents/DownloadButton";
import { useLeaseSubmit } from "../../hooks/useLeaseSubmit";

const LeasePreview = ({ formType, onEdit }) => {
  const [format, setFormat] = useState("pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Use Redux hook with form data
  const { 
    handleSubmit, 
    formData, 
    status, 
    error,
    isLoading 
  } = useLeaseSubmit(formType);

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await handleSubmit(format);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(err.message || "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <LeaseLoader
        message="Generating your lease document..."
        duration={5000}
      />
    );
  }

  // Handle empty form data
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="lease-preview">
        <h2>Preview Lease Agreement</h2>
        <p>No data to preview. Please fill out the form first.</p>
        <button 
          onClick={onEdit} 
          className="btn-edit"
        >
          Go Back & Edit
        </button>
      </div>
    );
  }

  // Format field names for display
  const formatFieldName = (field) => {
    // Convert camelCase to Title Case with spaces
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  };

  // Filter out empty or null values for cleaner preview
  const filteredFormData = Object.entries(formData).filter(
    ([, value]) => value !== null && value !== undefined && value !== ''
  );

  return (
    <div className="lease-preview">
      <div className="preview-header">
        <h2>Preview {formType} Lease Agreement</h2>
        <p>Review your lease details before final submission</p>
      </div>

      {/* Data grid */}
      <div className="preview-grid">
        {filteredFormData.map(([field, value]) => (
          <div key={field} className="preview-row">
            <strong>{formatFieldName(field)}:</strong>
            <span className="preview-value">
              {Array.isArray(value) 
                ? value.join(', ') 
                : typeof value === 'object' 
                  ? JSON.stringify(value, null, 2) 
                  : String(value || 'N/A')}
            </span>
          </div>
        ))}
      </div>

      {/* File format choice */}
      <div className="format-choice">
        <label className="format-option">
          <input
            type="radio"
            value="pdf"
            checked={format === "pdf"}
            onChange={(e) => setFormat(e.target.value)}
            disabled={isSubmitting}
          />
          <span>PDF</span>
        </label>
        <label className="format-option">
          <input
            type="radio"
            value="docx"
            checked={format === "docx"}
            onChange={(e) => setFormat(e.target.value)}
            disabled={isSubmitting}
          />
          <span>DOCX</span>
        </label>
      </div>

      {/* Actions */}
      <div className="preview-actions">
        <button 
          onClick={onEdit} 
          className="btn-edit"
          disabled={isSubmitting}
        >
          Go Back & Edit
        </button>

        <div className="action-buttons">
          <button
            onClick={handleFormSubmit}
            className="btn-confirm"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? `Generating ${format.toUpperCase()}...` 
              : `Save as ${format.toUpperCase()}`}
          </button>

          <DownloadButton
            formType={formType}
            formData={formData}
            format={format}
            filename={`${formType}-lease`}
            label={`Download ${format.toUpperCase()}`}
            onDownload={handleFormSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Error display */}
      {(error || submitError) && (
        <div className="error-message">
          <p>Error: {submitError || error?.message || 'Failed to process request'}</p>
          <button onClick={handleFormSubmit} className="btn-retry">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LeasePreview;
