// DownloadButton.jsx
import React from "react";

export default function DownloadButton({
  format = "pdf",
  label,
  onDownload, // required now
}) {
  const handleClick = () => {
    if (onDownload) onDownload(format);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        background: "#4CAF50",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
        marginRight: "10px",
      }}
    >
      {label || `Download ${format.toUpperCase()}`}
    </button>
  );
}
