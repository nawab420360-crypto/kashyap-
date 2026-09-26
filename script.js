/* ==========================================================================
   KASHYAP INTERNATIONAL — Interactive JavaScript
   ========================================================================== */

// ─── 1. SCROLL PROGRESS BAR ────────────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ─── 2. HEADER SHADOW ON SCROLL ────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (!header) return;
  if (window.scrollY > 60) {
    header.style.boxShadow = '0 10px 40px rgba(0,0,0,0.55)';
  } else {
    header.style.boxShadow = 'none';
  }
}, { passive: true });

// ─── 3. MOBILE NAV TOGGLE ──────────────────────────────────────────────────
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('nav-menu');

function toggleMobileNav() {
  if (!navMenu || !mobileToggle) return;
  const isOpen = navMenu.classList.toggle('active');
  mobileToggle.classList.toggle('open', isOpen);
  mobileToggle.setAttribute('aria-label', isOpen ? 'Close Menu' : 'Open Menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active') && header) {
    if (!header.contains(e.target)) {
      navMenu.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// ─── 4. ACTIVE NAV LINK ON SCROLL ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ─── 5. SCROLL REVEAL ANIMATIONS ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ─── 6. ANIMATED COUNTER STATS ─────────────────────────────────────────────
const statNums = document.querySelectorAll('.stat-num[data-target]');
let countersStarted = false;

function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNums.forEach(el => {
        animateCounter(el, parseInt(el.dataset.target), 2000);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ─── 7. PARALLAX HERO BACKGROUND ───────────────────────────────────────────
const heroBg = document.getElementById('heroBg');
function updateParallax() {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
}
window.addEventListener('scroll', updateParallax, { passive: true });

// ─── 8. PRODUCT CATEGORY FILTER ────────────────────────────────────────────
function filterCategory(category, btnEl) {
  // Update active tab button
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  // Filter product cards with fade animation
  const cards = document.querySelectorAll('.p-card');
  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    if (match) {
      card.style.display = 'flex';
      // Slight stagger re-entrance
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      setTimeout(() => { card.style.display = 'none'; }, 200);
    }
  });
}

// ─── 9. QUOTE MODAL ────────────────────────────────────────────────────────
const quoteModal = document.getElementById('quoteModal');

function openModal(stone) {
  if (!quoteModal) return;
  const stoneInput = document.getElementById('stoneTypeInput');
  if (stone && stoneInput) stoneInput.value = stone + ' Slabs';
  quoteModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!quoteModal) return;
  quoteModal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleBackdropClick(event) {
  if (event.target === quoteModal) closeModal();
}

function submitForm(event) {
  event.preventDefault();
  const submitBtn = event.target.querySelector('.modal-submit-btn');
  if (!submitBtn) return;

  // Show loading state
  const original = submitBtn.innerHTML;
  submitBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.8s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
    Sending...
  `;
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  // Add spin animation if needed
  if (!document.getElementById('spin-style')) {
    const style = document.createElement('style');
    style.id = 'spin-style';
    style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }

  setTimeout(() => {
    submitBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      Quote Request Sent!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    submitBtn.style.opacity = '1';

    setTimeout(() => {
      closeModal();
      // Reset form
      document.getElementById('quoteForm').reset();
      submitBtn.innerHTML = original;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 2200);
  }, 1200);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
    closeModal();
  }
});

// ─── 10. SMOOTH SCROLL (for older browsers that don't support CSS scroll-behavior) ─
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── 11. INITIALIZE ON PAGE LOAD ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Trigger scroll events on load to set initial state
  updateScrollProgress();
  updateActiveNav();
  updateParallax();

  // Initial reveal for elements already in viewport
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('visible');
    }
  });

  // Log for dev
  console.log('%c✦ Kashyap International Website Loaded', 
    'color:#C9A24B; font-weight:700; font-size:14px; font-family:serif;');
});
