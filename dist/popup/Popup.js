import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const Popup = () => {
    const [timeData, setTimeData] = useState({});
    useEffect(() => {
        // Fetch tracked time data from Chrome storage
        chrome.storage.local.get(["timeData"], (result) => {
            if (result.timeData) {
                setTimeData(result.timeData);
            }
        });
    }, []);
    return (_jsxs("div", { style: { width: "300px", padding: "10px", fontFamily: "Arial" }, children: [_jsx("h2", { children: "Productivity Tracker" }), _jsx("ul", { children: Object.entries(timeData).map(([site, time]) => (_jsxs("li", { children: [_jsxs("strong", { children: [site, ":"] }), " ", time, " seconds"] }, site))) })] }));
};
export default Popup;
