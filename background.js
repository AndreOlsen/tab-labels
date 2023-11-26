/* chrome.runtime.onInstalled.addListener(function () {
    // Set default domains if not already set
    chrome.storage.sync.get("domains", function (result) {
      if (!result.domains) {
        chrome.storage.sync.set({ domains: [] });
      }
    });
  });
  
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
      chrome.storage.sync.get("domains", function (result) {
        const domains = result.domains || [];
        const matchingDomain = domains.find(domain => tab.url.includes(domain));
        
        if (matchingDomain) {
          chrome.tabs.executeScript(tabId, {
            code: `document.title = "${matchingDomain} - " + document.title;`
          });
        }
      });
    }
  });
   */