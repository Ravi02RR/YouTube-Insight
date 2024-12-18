document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateSummary');
    const statusDiv = document.getElementById('status');
  
    generateButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentTab = tabs[0];
  
        if (currentTab.url && currentTab.url.includes('youtube.com/watch')) {
          chrome.tabs.sendMessage(currentTab.id, { action: 'generateSummary' }, function(response) {
            if (chrome.runtime.lastError) {
              statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
              return;
            }
  
            if (response && response.status === 'success') {
              statusDiv.textContent = 'Insight generated successfully!';
              statusDiv.style.color = '#BB86FC';
            } else {
              statusDiv.textContent = 'Failed to generate insight';
              statusDiv.style.color = '#FF6B6B';
            }
          });
        } else {
          statusDiv.textContent = 'Open a YouTube video first';
          statusDiv.style.color = '#FF6B6B';
        }
      });
    });
  });