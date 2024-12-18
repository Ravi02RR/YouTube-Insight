const SUMMARY_STYLES = `
  :root {
    --deep-background: #0a0a1a;
    --rich-background: #121229;
    --elegant-primary: #6a5acd;
    --soft-primary: #8a7eff;
    --accent-color: #4dabf7;
    --text-primary: #e6e6fa;
    --text-secondary: #a0a0c0;
    --shadow-elegant: 0 12px 24px rgba(0,0,0,0.3);
  }

  @keyframes fadeInSmoothly {
    from { 
      opacity: 0;
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideFromBottom {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .insight-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 26, 0.95);
    backdrop-filter: blur(20px);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeInSmoothly 0.4s ease-out;
  }

  .insight-modal {
  
    width: 90%;
    max-height: 85vh;
    padding: 40px;
    overflow-y: auto;
    color: var(--text-primary);
    animation: slideFromBottom 0.5s ease-out;
    position: relative;
  }

  .insight-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.7;
    transform: scale(1);
  }

  .insight-close-btn:hover {
    color: var(--soft-primary);
    opacity: 1;
    transform: rotate(90deg);
  }



  .generate-summary-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(145deg, var(--soft-primary), var(--elegant-primary));
    color: white;
    border: none;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-elegant);
    cursor: pointer;
    z-index: 9999;
    transition: all 0.4s ease;
    transform: scale(1);
  }

  .generate-summary-btn:hover {
    transform: scale(1.1) rotate(360deg);
    box-shadow: 0 15px 30px rgba(106, 90, 205, 0.4);
  }

  .insight-export-btn {
    background: linear-gradient(145deg, var(--accent-color), #4d79ff);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    margin-top: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 15px rgba(77, 121, 255, 0.3);
  }

  .insight-export-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(77, 121, 255, 0.4);
  }
`;

const ICONS = {
  summary: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  pdf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
};

const styleElement = document.createElement('style');
styleElement.textContent = SUMMARY_STYLES;
document.head.appendChild(styleElement);
function createSummaryButton() {
  const button = document.createElement('button');
  button.classList.add('generate-summary-btn');
  button.innerHTML = `${ICONS.summary} Generate Insight`;

  button.addEventListener('click', generateSummary);
  document.body.appendChild(button);
}
function showLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('insight-overlay');
  overlay.innerHTML = `
    <div class="insight-modal">
      <div class="insight-loader"></div>
      <p style="text-align: center; color: #BB86FC; margin-top: 15px;">
        Generating Video Insight...
      </p>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.style.display = 'flex';
  return overlay;
}


function hideLoadingOverlay(overlay) {
  overlay.style.opacity = '0';
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 300);
}


async function fetchSummary(url) {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/transcript?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Summary fetch failed');
    return await response.json();
  } catch (error) {
    console.error("Summary fetch error:", error);
    throw error;
  }
}


function exportToPDF(summaryData) {

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>YouTube Video Insight</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          h1 { 
            color: #BB86FC; 
            border-bottom: 2px solid #BB86FC;
            padding-bottom: 10px;
          }
          h2 { 
            color: #9154D4; 
            margin-top: 20px;
          }
          .key-topics {
            font-style: italic;
            color: #666;
          }
        </style>
      </head>
      <body>
        <h1>YouTube Video Insight</h1>
        ${summaryData.map(item => `
          <div>
            <h2>${item.timestamp} - ${item.title}</h2>
            <p class="key-topics">Key Topics: ${item.keyTopics.join(', ')}</p>
            <p>${item.description}</p>
          </div>
        `).join('')}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
}


function displaySummary(summaryData) {
  const overlay = document.createElement('div');
  overlay.classList.add('insight-overlay');
  overlay.style.display = 'flex';

  const modal = document.createElement('div');
  modal.classList.add('insight-modal');

  const closeButton = document.createElement('button');
  closeButton.classList.add('insight-close-btn');
  closeButton.innerHTML = ICONS.close;
  closeButton.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  });


  modal.innerHTML = `
    <h2 style="color: #BB86FC; border-bottom: 2px solid #BB86FC; padding-bottom: 10px; margin-bottom: 20px;">
      Video Insight
    </h2>
    ${summaryData.map(item => `
      <div style="margin-bottom: 20px;">
        <h3 style="color: #BB86FC; font-size: 2 rem;">${item.timestamp} - ${item.title}</h3>
        <p style="color: #B0B0B0; font-style: italic; margin-bottom: 10px;">
          Key Topics: ${item.keyTopics.join(', ')}
        </p>
        <p style="color: #E0E0E0; line-height: 1.6;">${item.description}</p>
      </div>
    `).join('')}
  `;


  const exportButton = document.createElement('button');
  exportButton.classList.add('insight-export-btn');
  exportButton.innerHTML = `${ICONS.pdf} Export as PDF`;
  exportButton.addEventListener('click', () => {
    exportToPDF(summaryData);
  });

  modal.appendChild(closeButton);
  modal.appendChild(exportButton);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}


async function generateSummary() {
  const overlay = showLoadingOverlay();

  try {
    const url = window.location.href;
    const summaryData = await fetchSummary(url);

    hideLoadingOverlay(overlay);
    displaySummary(summaryData.summary[0]);
  } catch (error) {
    hideLoadingOverlay(overlay);
    console.error("Summary generation error:", error);
    alert("Failed to generate video insight. Please try again.");
  }
}


if (window.location.href.includes('youtube.com/watch')) {
  createSummaryButton();
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateSummary') {
    generateSummary();
    sendResponse({ status: 'success' });
  }
});