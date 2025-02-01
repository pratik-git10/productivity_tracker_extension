import React, { useState, useEffect } from "react";

const Popup = () => {
  const [timeData, setTimeData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Fetch tracked time data from Chrome storage
    chrome.storage.local.get(["timeData"], (result) => {
      if (result.timeData) {
        setTimeData(result.timeData);
      }
    });
  }, []);

  return (
    <div
      style={{
        width: "300px",
        border: "20px",
        padding: "10px",
        fontFamily: "Arial",
      }}>
      <h2>Productivity Tracker</h2>
      <ul>
        {Object.entries(timeData).map(([site, time]) => (
          <li key={site}>
            <strong>{site}:</strong> {time} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
