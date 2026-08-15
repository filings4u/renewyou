/**
 * ReNew You Health & Wellness - Weight Management Master Controller
 * Location: assets/js/weight-management.js
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hero layout engine
  if (typeof renderWeightManagementHero === 'function') {
    renderWeightManagementHero();
  }

  // Initialize modular body content engine
  if (typeof renderWeightManagementContent === 'function') {
    renderWeightManagementContent();
  }
});
