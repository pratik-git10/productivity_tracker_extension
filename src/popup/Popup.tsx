import React, { useState, useEffect } from "react";

const Popup = () => {
  const [timeData, setTimeData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["timeData"], (result) => {
      if (result.timeData) {
        setTimeData(result.timeData);
      }
      setLoading(false);
    });
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const clearData = () => {
    chrome.storage.local.set({ timeData: {} }, () => {
      setTimeData({});
    });
  };

  return (
    <div className="w-[400px] bg-gray-900 text-white p-10 shadow-lg">
      <h2 className="text-center text-xl font-bold mb-3">
        ⏳ Productivity Tracker
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Object.keys(timeData).length === 0 ? (
        <p className="text-center text-gray-400">No data tracked yet.</p>
      ) : (
        <ul className="space-y-2">
          {Object.entries(timeData).map(([site, time]) => (
            <li
              key={site}
              className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md">
              <span className="font-medium">{site}</span>
              <span className="text-gray-300">{formatTime(time)}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={clearData}
        className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-2 mt-4 rounded-md transition">
        Clear Data
      </button>
    </div>
  );
};

export default Popup;
