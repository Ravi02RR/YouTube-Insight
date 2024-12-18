// export const SUMMARY_STYLES = `
//   :root {
//     --deep-background: #0a0a1a;
//     --rich-background: #121229;
//     --elegant-primary: #6a5acd;
//     --soft-primary: #8a7eff;
//     --accent-color: #4dabf7;
//     --text-primary: #e6e6fa;
//     --text-secondary: #a0a0c0;
//     --shadow-elegant: 0 12px 24px rgba(0,0,0,0.3);
//   }

//   @keyframes fadeInSmoothly {
//     from { 
//       opacity: 0;
//       transform: scale(0.95);
//     }
//     to { 
//       opacity: 1;
//       transform: scale(1);
//     }
//   }

//   @keyframes slideFromBottom {
//     from { 
//       opacity: 0;
//       transform: translateY(30px);
//     }
//     to { 
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   @keyframes pulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.05); }
//   }

//   .insight-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(10, 10, 26, 0.95);
//     backdrop-filter: blur(20px);
//     display: none;
//     justify-content: center;
//     align-items: center;
//     z-index: 10000;
//     animation: fadeInSmoothly 0.4s ease-out;
//   }

//   .insight-modal {
  
//     width: 90%;
//     max-height: 85vh;
//     padding: 40px;
//     overflow-y: auto;
//     color: var(--text-primary);
//     animation: slideFromBottom 0.5s ease-out;
//     position: relative;
//   }

//   .insight-close-btn {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     background: transparent;
//     border: none;
//     color: var(--text-secondary);
//     font-size: 2rem;
//     cursor: pointer;
//     transition: all 0.3s ease;
//     opacity: 0.7;
//     transform: scale(1);
//   }

//   .insight-close-btn:hover {
//     color: var(--soft-primary);
//     opacity: 1;
//     transform: rotate(90deg);
//   }



//   .generate-summary-btn {
//     position: fixed;
//     bottom: 30px;
//     right: 30px;
//     background: linear-gradient(145deg, var(--soft-primary), var(--elegant-primary));
//     color: white;
//     border: none;
//     border-radius: 50%;
//     width: 70px;
//     height: 70px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     box-shadow: var(--shadow-elegant);
//     cursor: pointer;
//     z-index: 9999;
//     transition: all 0.4s ease;
//     transform: scale(1);
//   }

//   .generate-summary-btn:hover {
//     transform: scale(1.1) rotate(360deg);
//     box-shadow: 0 15px 30px rgba(106, 90, 205, 0.4);
//   }

//   .insight-export-btn {
//     background: linear-gradient(145deg, var(--accent-color), #4d79ff);
//     color: white;
//     border: none;
//     border-radius: 12px;
//     padding: 12px 24px;
//     margin-top: 20px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.3s ease;
//     box-shadow: 0 8px 15px rgba(77, 121, 255, 0.3);
//   }

//   .insight-export-btn:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 12px 20px rgba(77, 121, 255, 0.4);
//   }
// `;
