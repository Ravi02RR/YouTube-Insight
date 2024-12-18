// export function createSummaryButton() {
//     const button = document.createElement('button');
//     button.classList.add('generate-summary-btn');
//     button.innerHTML = `${ICONS.summary} Generate Insight`;

//     button.addEventListener('click', generateSummary);
//     document.body.appendChild(button);
// }
// export function showLoadingOverlay() {
//     const overlay = document.createElement('div');
//     overlay.classList.add('insight-overlay');
//     overlay.innerHTML = `
//       <div class="insight-modal">
//         <div class="insight-loader"></div>
//         <p style="text-align: center; color: #BB86FC; margin-top: 15px;">
//           Generating Video Insight...
//         </p>
//       </div>
//     `;
//     document.body.appendChild(overlay);
//     overlay.style.display = 'flex';
//     return overlay;
// }


// export function hideLoadingOverlay(overlay) {
//     overlay.style.opacity = '0';
//     setTimeout(() => {
//         document.body.removeChild(overlay);
//     }, 300);
// }


// export async function fetchSummary(url) {
//     try {
//         const response = await fetch(`http://localhost:3000/api/v1/transcript?url=${encodeURIComponent(url)}`);
//         if (!response.ok) throw new Error('Summary fetch failed');
//         return await response.json();
//     } catch (error) {
//         console.error("Summary fetch error:", error);
//         throw error;
//     }
// }


// export function exportToPDF(summaryData) {

//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>YouTube Video Insight</title>
//           <style>
//             body { 
//               font-family: Arial, sans-serif; 
//               max-width: 800px; 
//               margin: 0 auto; 
//               padding: 20px;
//               line-height: 1.6;
//               color: #333;
//             }
//             h1 { 
//               color: #BB86FC; 
//               border-bottom: 2px solid #BB86FC;
//               padding-bottom: 10px;
//             }
//             h2 { 
//               color: #9154D4; 
//               margin-top: 20px;
//             }
//             .key-topics {
//               font-style: italic;
//               color: #666;
//             }
//           </style>
//         </head>
//         <body>
//           <h1>YouTube Video Insight</h1>
//           ${summaryData.map(item => `
//             <div>
//               <h2>${item.timestamp} - ${item.title}</h2>
//               <p class="key-topics">Key Topics: ${item.keyTopics.join(', ')}</p>
//               <p>${item.description}</p>
//             </div>
//           `).join('')}
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//     printWindow.print();
// }

// export function displaySummary(summaryData) {
//     const overlay = document.createElement('div');
//     overlay.classList.add('insight-overlay');
//     overlay.style.display = 'flex';

//     const modal = document.createElement('div');
//     modal.classList.add('insight-modal');

//     const closeButton = document.createElement('button');
//     closeButton.classList.add('insight-close-btn');
//     closeButton.innerHTML = ICONS.close;
//     closeButton.addEventListener('click', () => {
//         overlay.style.opacity = '0';
//         setTimeout(() => {
//             document.body.removeChild(overlay);
//         }, 300);
//     });


//     modal.innerHTML = `
//       <h2 style="color: #BB86FC; border-bottom: 2px solid #BB86FC; padding-bottom: 10px; margin-bottom: 20px;">
//         Video Insight
//       </h2>
//       ${summaryData.map(item => `
//         <div style="margin-bottom: 20px;">
//           <h3 style="color: #BB86FC; font-size: 2 rem;">${item.timestamp} - ${item.title}</h3>
//           <p style="color: #B0B0B0; font-style: italic; margin-bottom: 10px;">
//             Key Topics: ${item.keyTopics.join(', ')}
//           </p>
//           <p style="color: #E0E0E0; line-height: 1.6;">${item.description}</p>
//         </div>
//       `).join('')}
//     `;
// }  