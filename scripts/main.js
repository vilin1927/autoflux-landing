// ======================================
// AutoFlux Landing Page - Main JavaScript
// ======================================

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ======================================
// SMOOTH SCROLL
// ======================================
const smoothButtons = document.querySelectorAll('[data-scroll]');
smoothButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selector = button.getAttribute('data-scroll');
    const target = selector ? document.querySelector(selector) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======================================
// SCROLL ANIMATIONS - Intersection Observer
// ======================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve so animations can repeat if desired
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  '.fade-in, .fade-in-up, .slide-in-left, .slide-in-right'
);

animatedElements.forEach(el => observer.observe(el));

// ======================================
// NUMBER COUNTER ANIMATION
// ======================================
const counterElements = document.querySelectorAll('.counter');

const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Create observer for counter elements
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// ======================================
// PARALLAX EFFECT (subtle)
// ======================================
let ticking = false;
let lastScrollY = window.scrollY;

const updateParallax = () => {
  const scrollY = window.scrollY;
  const parallaxElements = document.querySelectorAll('.parallax-slow');

  parallaxElements.forEach(el => {
    const speed = 0.3; // Adjust for intensity
    const yPos = -(scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });

  ticking = false;
};

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// ======================================
// FORM HANDLING
// ======================================
const wireForm = (formId, successMessage) => {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const successEl = form.querySelector('.form-success');

    // Disable button and show loading state
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      if (successEl) {
        successEl.textContent = successMessage;
        successEl.style.color = 'var(--primary-blue)';
      }

      form.reset();

      if (button) {
        button.disabled = false;
        button.textContent = formId === 'scope-form'
          ? 'Book My Blueprint Call'
          : 'Send Message & Book Blueprint Call';
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        if (successEl) successEl.textContent = '';
      }, 5000);
    }, 1000);
  });
};

wireForm('scope-form', '✓ Thanks! We\'ll reach out within 24 hours to schedule your blueprint call.');
wireForm('contact-form', '✓ Message received! Expect a reply within one business day.');

// ======================================
// CASE CARD HOVER EFFECTS
// ======================================
const caseCards = document.querySelectorAll('.case-card');

caseCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const video = card.querySelector('.case-card__video');
    if (video) {
      video.style.transform = 'scale(1.05)';
      video.style.transition = 'transform 0.4s ease';
    }
  });

  card.addEventListener('mouseleave', () => {
    const video = card.querySelector('.case-card__video');
    if (video) {
      video.style.transform = 'scale(1)';
    }
  });
});

// ======================================
// HEADER SCROLL EFFECT
// ======================================
const header = document.querySelector('.primary-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 12px rgba(15, 28, 63, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ======================================
// TOOL BADGE HOVER EFFECT
// ======================================
const toolBadges = document.querySelectorAll('.tool-badge');

toolBadges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'translateY(-2px)';
    badge.style.boxShadow = '0 4px 8px rgba(26, 79, 246, 0.15)';
  });

  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'translateY(0)';
    badge.style.boxShadow = 'none';
  });
});

// ======================================
// LAZY LOAD OPTIMIZATION (for future video embeds)
// ======================================
if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const videoPlaceholder = entry.target;
        // When actual videos are added, load them here
        videoObserver.unobserve(videoPlaceholder);
      }
    });
  });

  const videoPlaceholders = document.querySelectorAll('.case-card__video');
  videoPlaceholders.forEach(placeholder => videoObserver.observe(placeholder));
}

// ======================================
// CONSOLE MESSAGE (optional branding)
// ======================================
console.log(
  '%cAutoFlux',
  'color: #1A4FF6; font-size: 24px; font-weight: bold; font-family: Inter, sans-serif;'
);
console.log(
  '%cInterested in how we built this? hello@autoflux.ai',
  'color: #67C8FF; font-size: 12px; font-family: Inter, sans-serif;'
);
