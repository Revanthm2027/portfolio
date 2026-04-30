document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.add('open');
      // Change hamburger to X (simple implementation)
      hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      hamburger.children[1].style.opacity = '0';
      hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      mobileMenu.classList.remove('open');
      // Revert hamburger
      hamburger.children[0].style.transform = 'none';
      hamburger.children[1].style.opacity = '1';
      hamburger.children[2].style.transform = 'none';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Navbar Scroll Effect with requestAnimationFrame
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Scroll Reveal using IntersectionObserver (Highly Performant)
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // Fast Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 64; // Navbar height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = elementPosition - headerOffset;
        const duration = 300; // milliseconds
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          // easeOutCubic
          const easeProgress = 1 - Math.pow(1 - progress / duration, 3);
          const currentPosition = startPosition + distance * easeProgress;
          
          window.scrollTo(0, currentPosition);
          
          if (progress < duration) {
            window.requestAnimationFrame(step);
          } else {
            window.scrollTo(0, startPosition + distance);
          }
        }
        
        window.requestAnimationFrame(step);
      }
    });
  });
});
