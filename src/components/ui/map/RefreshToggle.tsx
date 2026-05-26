import React, { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "./RefreshToggle.scss";
const PAN_OFFSET_DEGREES = 0.00000001;

export const RefreshToggle: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const map = useMap();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get refresh interval from environment variable (in seconds), default to 5 seconds
  const refreshIntervalSeconds = import.meta.env.VITE_MAP_REFRESH_INTERVAL
    ? parseInt(import.meta.env.VITE_MAP_REFRESH_INTERVAL)
    : 5;
  const refreshInterval = refreshIntervalSeconds * 1000; // Convert to milliseconds

  useEffect(() => {
    if (isActive) {
      // Start the refresh interval
      intervalRef.current = setInterval(() => {
        // Get current center
        const currentCenter = map.getCenter();

        // Pan by a minimal amount (0.00001 degrees, approximately 1 meter)
        const newLat = currentCenter.lat + PAN_OFFSET_DEGREES;
        const newLng = currentCenter.lng + PAN_OFFSET_DEGREES;

        // Pan to the new position and then back to create a refresh effect
        map.panTo([newLat, newLng], { animate: false });
        setTimeout(() => {
          map.panTo([currentCenter.lat, currentCenter.lng], { animate: false });
        }, 50);
      }, refreshInterval);
    } else {
      // Clear the interval when inactive
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, map, refreshInterval]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="refresh-toggle-root">
      <button
        className={`refresh-toggle-button ${isActive ? "active" : ""}`}
        onClick={handleToggle}
        title={isActive ? "Stop auto-refresh" : "Start auto-refresh"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={isActive ? "rotating" : ""}
        >
          <path
            d="M21.65 10.35a9.93 9.93 0 0 0-1.73-4.27A10 10 0 0 0 12 2a10 10 0 0 0-8.36 4.54"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.65 13.65a9.93 9.93 0 0 0 1.73 4.27A10 10 0 0 0 12 22a10 10 0 0 0 8.36-4.54"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6l3.64 3.64L10.28 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 18l-3.64-3.64L13.72 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
