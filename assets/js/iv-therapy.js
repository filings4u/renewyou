/**
 * ReNew You Health & Wellness - IV Therapy Master Controller
 * Location: assets/js/iv-therapy.js
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic content controller module
  if (typeof renderIvTherapyContent === 'function') {
    renderIvTherapyContent();
  }
});
