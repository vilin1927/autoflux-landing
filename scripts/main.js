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
// MOBILE NAV TOGGLE
// ======================================
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

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

// Auto-apply staggered delays for grouped elements so they reveal sequentially on scroll
const staggerGroups = document.querySelectorAll('.process__steps, .capabilities .grid, .results__grid, .metrics, .contact__grid');
staggerGroups.forEach(group => {
  const children = Array.from(group.children);
  children.forEach((child, idx) => {
    if (child.classList.contains('fade-in') || child.classList.contains('fade-in-up') || child.classList.contains('slide-in-left') || child.classList.contains('slide-in-right')) {
      child.style.transitionDelay = `${0.12 * idx}s`;
    }
  });
});

// Fallback: ensure visibility if observer fails
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    animatedElements.forEach(el => el.classList.add('visible'));
  }, 1200);
});

// ======================================
// AUTO-SCROLLING MARQUEES / CAROUSELS
// ======================================
const initAutoScroll = () => {
  const tracks = document.querySelectorAll('[data-auto-scroll="true"] .logos__marquee-track');
  tracks.forEach(track => {
    track.addEventListener('pointerenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('pointerleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
};

initAutoScroll();

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
// CAL.COM EMBED (inline + popup triggers)
// ======================================
const initCalEmbed = () => {
  const inlineSelector = '#contact-cal-inline-30min';
  const inlineTarget = document.querySelector(inlineSelector);
  const triggerButtons = document.querySelectorAll('[data-cal-link]');

  if (!inlineTarget && triggerButtons.length === 0) return;

  // Cal embed loader (from Cal.com docs)
  (function (C, A, L) {
    const p = function (a, ar) { a.q.push(ar); };
    const d = C.document;
    C.Cal = C.Cal || function () {
      const cal = C.Cal; const ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1]; api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');

  const namespace = '30min';
  const calLink = 'vladimir-ilin-dq2q4k/30min';
  const commonConfig = {
    layout: 'month_view',
    theme: 'light',
    styles: {
      branding: {
        brandColor: '#0D47A1',
        lightColor: '#00E5FF',
        lighterColor: '#F8FAFC',
        lightestColor: '#FFFFFF',
        highlightColor: '#00E5FF',
        medianColor: '#0A3380'
      }
    }
  };

  Cal('init', namespace, { origin: 'https://app.cal.com' });

  if (inlineTarget) {
    Cal.ns[namespace]('inline', {
      elementOrSelector: inlineSelector,
      config: commonConfig,
      calLink
    });
  }

  Cal.ns[namespace]('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
    styles: {
      branding: {
        brandColor: '#0D47A1',
        lightColor: '#00E5FF'
      }
    }
  });
};

initCalEmbed();

// ======================================
// HERO STACK SHUFFLE
// ======================================
const initHeroStackShuffle = () => {
  const cards = Array.from(document.querySelectorAll('.hero__visual .hero-visual__card'));
  if (cards.length < 2) return;

  let offset = 0;
  const applyPositions = () => {
    cards.forEach((card, idx) => {
      const pos = ((idx - offset) % cards.length + cards.length) % cards.length;
      card.classList.remove('stack-pos-1', 'stack-pos-2', 'stack-pos-3');
      if (pos === 0) card.classList.add('stack-pos-1');
      if (pos === 1) card.classList.add('stack-pos-2');
      if (pos === 2) card.classList.add('stack-pos-3');
    });
  };

  applyPositions();
  setInterval(() => {
    offset = (offset + 1) % cards.length;
    applyPositions();
  }, 6000);
};

initHeroStackShuffle();

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
