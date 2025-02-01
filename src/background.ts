/// <reference types="chrome" />

console.log("Background script running...");

// Store active tab info
let currentSite: string | null = null;
let startTime: number | null = null;

// Function to save time spent
const saveTimeSpent = (url: string, duration: number) => {
  chrome.storage.local.get(["timeData"], (result) => {
    const timeData = result.timeData || {};
    timeData[url] = (timeData[url] || 0) + duration;
    chrome.storage.local.set({ timeData });
    console.log(`Updated time for ${url}: ${timeData[url]} seconds`);
  });
};

// Function to get domain from URL
const getDomain = (url: string | undefined): string | null => {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
};

// Handle tab switch
chrome.tabs.onActivated.addListener((activeInfo: chrome.tabs.TabActiveInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab: chrome.tabs.Tab) => {
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
