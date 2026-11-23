/**
 * FixMyRide - Scroll-triggered fade-in animations
 * Owner: Member 3
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 3. SCROLL-TRIGGERED FADE-IN ANIMATIONS (IntersectionObserver)
  // =========================================================================
  // Elements to animate as user scrolls
  const animatedElements = document.querySelectorAll(
    '.problem-card, .step-card, .feature-card, .screenshot-item, .team-card, .cta-card'
  );

  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    animatedElements.forEach((el) => {
      el.classList.add('fade-in-section');
      appearOnScroll.observe(el);
    });
  } else {
    // Fallback for older browsers without IntersectionObserver
    animatedElements.forEach((el) => el.classList.add('is-visible'));
  }
});
