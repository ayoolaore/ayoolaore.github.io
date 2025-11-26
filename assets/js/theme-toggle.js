/**
 * Theme Toggle with System Preference Detection
 * Supports automatic light/dark mode switching with localStorage persistence
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'theme-preference';
  const THEME_ATTR = 'data-theme';

  // Get theme preference from various sources
  const getColorPreference = () => {
    // Check localStorage first
    if (localStorage.getItem(STORAGE_KEY)) {
      return localStorage.getItem(STORAGE_KEY);
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Set theme on document root
  const setTheme = (theme) => {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButton(theme);
  };

  // Update toggle button icon
  const updateToggleButton = (theme) => {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');

    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      toggleBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTR);
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Add a subtle animation class to the body
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getColorPreference();
    setTheme(theme);

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  // Setup toggle button click handler
  const setupToggleButton = () => {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
      toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      setupToggleButton();
    });
  } else {
    initTheme();
    setupToggleButton();
  }

  // Early theme application (prevent flash)
  initTheme();

})();
