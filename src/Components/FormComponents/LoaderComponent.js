// components/Loader/LeaseLoader.jsx
import React, { useEffect, useState } from "react";
import "../CSS/LoaderComponent.css";

const LeaseLoader = ({ message = "AI is preparing your lease...", duration = 5000, onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onFinish) onFinish();
          return 100;
        }
        return prev + 100 / (duration / 200); // updates every 200ms
      });
    }, 200);

    return () => clearInterval(interval);
  }, [duration, onFinish]);

  return (
    <div className="lease-loader">
      <div className="loader-circle"></div>
      <p>{message}</p>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default LeaseLoader;
