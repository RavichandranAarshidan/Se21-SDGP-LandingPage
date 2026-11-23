/**
 * FixMyRide - Splash screen / preloader
 * Owner: Member 2
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 0. SPLASH SCREEN / PRELOADER DISMISSAL
  // Displays the brand intro on initial load and smoothly fades out.
  // =========================================================================
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    let isHidden = false;

    const hideSplashScreen = () => {
      if (isHidden) return;
      isHidden = true;

      splashScreen.classList.add('fade-out');
      splashScreen.setAttribute('aria-busy', 'false');
      splashScreen.setAttribute('aria-hidden', 'true');

      // Hide display after fade transition completes
      setTimeout(() => {
        splashScreen.style.display = 'none';
      }, 550);
    };

    // Keep splash screen visible for ~1.4s so the progress and pulse finish smoothly
    const minDisplayDuration = 1400;
    const pageStartTime = performance.now();

    window.addEventListener('load', () => {
      const elapsed = performance.now() - pageStartTime;
      const remainingTime = Math.max(0, minDisplayDuration - elapsed);
      setTimeout(hideSplashScreen, remainingTime);
    });

    // Safety fallback: dismiss after 3s maximum
    setTimeout(hideSplashScreen, 3000);
  }
});
