/**
 * FixMyRide - Mobile navigation, sticky header & back-to-top
 * Owner: Member 1
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. MOBILE NAVIGATION & HAMBURGER MENU
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const primaryNav = document.getElementById('primary-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  if (hamburgerBtn && primaryNav) {
    const toggleNav = (forceState = null) => {
      const isCurrentlyOpen = primaryNav.classList.contains('open');
      const shouldOpen = forceState !== null ? forceState : !isCurrentlyOpen;

      hamburgerBtn.classList.toggle('active', shouldOpen);
      primaryNav.classList.toggle('open', shouldOpen);
      hamburgerBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

      // Prevent background scrolling on small screens when menu is open
      if (window.innerWidth <= 768) {
        document.body.style.overflow = shouldOpen ? 'hidden' : '';
      }
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });

    // Close mobile nav when clicking any link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('open')) {
          toggleNav(false);
        }
      });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
        toggleNav(false);
        hamburgerBtn.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        primaryNav.classList.contains('open') &&
        !primaryNav.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        toggleNav(false);
      }
    });

    // Reset overflow when resizing beyond mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && primaryNav.classList.contains('open')) {
        toggleNav(false);
      }
    });
  }

  // =========================================================================
  // 2. STICKY HEADER ELEVATION & BACK-TO-TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScrollState = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Sticky header shadow
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollState, { passive: true });
  handleScrollState(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
