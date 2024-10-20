chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Proceed only when the tab is fully loaded
  if (changeInfo.status === 'complete' && tab.url) {
    labelTab(tabId, tab.url);
  }
});

function labelTab(tabId, url) {
  // Retrieve patterns from storage
  chrome.storage.sync.get('patterns', (data) => {
    const patterns = data.patterns || [];
    for (let item of patterns) {
      if (url.includes(item.pattern)) {
        // Inject script to modify the tab's title and favicon
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: modifyPage,
          args: [item.label, item.color],
        });

        break; // Stop after the first match
      }
    }
  });
}

function modifyPage(label, color) {
  // Prepend label to the document title
  document.title = `${label} ${document.title}`;

  // Change favicon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Generate a colored favicon
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 16;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(0, 0, 16, 16);
  link.href = canvas.toDataURL();
}