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
    <div className="w-[600px] rounded-md p-10">
      <h2 className="flex justify-center items-center">Productivity Tracker</h2>
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
