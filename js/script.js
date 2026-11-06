/**
 * Vivex Network - Interactive Web Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = '☰';
      }
    });
  }

  // 2. Auto-Highlight Active Nav Link
  const currentPath = window.location.pathname;
  const navAnchors = document.querySelectorAll('.nav-link');

  navAnchors.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      // Clean matching for relative subfolders
      if (
        (currentPath.endsWith('/') && href === './') ||
        (currentPath.includes('/whitepaper') && href.includes('whitepaper')) ||
        (currentPath.includes('/privacy') && href.includes('privacy')) ||
        (currentPath.includes('/terms') && href.includes('terms'))
      ) {
        link.classList.add('active');
      }
    }
  });

  // 3. Table of Contents Scroll Observer (for doc-sidebar)
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.doc-section');

  if (sidebarLinks.length > 0 && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          sidebarLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
});
