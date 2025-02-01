"use strict";
/// <reference types="chrome" />
console.log("Background script running...");
// Store active tab info
let currentSite = null;
let startTime = null;
// Function to save time spent
const saveTimeSpent = (url, duration) => {
    chrome.storage.local.get(["timeData"], (result) => {
        const timeData = result.timeData || {};
        timeData[url] = (timeData[url] || 0) + duration;
        chrome.storage.local.set({ timeData });
        console.log(`Updated time for ${url}: ${timeData[url]} seconds`);
    });
};
// Function to get domain from URL
const getDomain = (url) => {
    if (!url)
        return null;
    try {
        return new URL(url).hostname;
    }
    catch (e) {
        return null;
    }
};
// Handle tab switch
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url) {
            const newSite = getDomain(tab.url);
            if (newSite && newSite !== currentSite) {
                const endTime = Date.now();
                if (currentSite && startTime) {
                    const timeSpent = Math.floor((endTime - startTime) / 1000);
                    saveTimeSpent(currentSite, timeSpent);
                }
                currentSite = newSite;
                startTime = endTime;
            }
        }
    });
});
// Handle browser close or extension disable
chrome.runtime.onSuspend.addListener(() => {
    if (currentSite && startTime) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        saveTimeSpent(currentSite, timeSpent);
    }
});
