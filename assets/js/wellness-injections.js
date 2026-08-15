/**
 * ReNew You Health & Wellness - Wellness Injections Master Controller
 * Location: assets/js/wellness-injections.js
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic injection section layout module
  if (typeof renderWellnessInjectionsContent === 'function') {
    renderWellnessInjectionsContent();
  }
});
