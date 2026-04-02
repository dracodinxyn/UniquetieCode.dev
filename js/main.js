// js/main.js - Foundation scripts

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded – ready');

  // Auto year in footer (common pattern)
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});