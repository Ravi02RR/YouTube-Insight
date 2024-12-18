chrome.runtime.onInstalled.addListener(() => {
    console.log("YouTube Insight Extension Installed!");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('youtube.com/watch')) {
      chrome.tabs.sendMessage(tab.id, { action: 'generateSummary' });
    }
  });