
  // ==========================================================
  // Reveal on scroll
  // ==========================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ==========================================================
  // Active nav link tracking (IntersectionObserver on each section)
  // ==========================================================
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  const sectionIds = ['features', 'how', 'pricing'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${id}`);
    });
  };

  // Track which section occupies the middle of the viewport
  const activeObserver = new IntersectionObserver((entries) => {
    // Pick the entry with the greatest intersection ratio that is currently intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible.length) setActive(visible[0].target.id);
  }, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });
  sections.forEach(s => activeObserver.observe(s));

  // Clear active state when scrolled back to top (hero region)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 400) {
      navLinks.forEach(a => a.classList.remove('active'));
    }
  }, { passive: true });

  // ==========================================================
  // Smooth scroll for every in-page anchor (graceful fallback if
  // CSS scroll-behavior isn't supported)
  // ==========================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
      // Update URL without jumping
      history.pushState(null, '', href);
    });
  });

  // ==========================================================
  // Nav subtle shrink on scroll for stronger focus
  // ==========================================================
  const nav = document.querySelector('.nav-inner');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      if (y > 40) nav.style.boxShadow = '0 10px 30px rgba(14,18,16,.08)';
      else nav.style.boxShadow = '0 4px 20px rgba(14,18,16,.04)';
    }
    lastScroll = y;
  }, { passive: true });

  // ==========================================================
  // Tilt preview on scroll (subtle parallax)
  // ==========================================================
  const frame = document.querySelector('.preview-frame');
  if (frame && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const r = frame.getBoundingClientRect();
          const vh = window.innerHeight;
          const p = Math.max(-1, Math.min(1, (r.top + r.height/2 - vh/2) / vh));
          frame.style.transform = `perspective(1600px) rotateX(${-p * 1.8}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================
  // Waitlist form handling
  // ==========================================================
  const form = document.getElementById('waitlistForm');
  const emailInput = document.getElementById('waitlistEmail');
  const note = document.getElementById('waitlistNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        note.textContent = 'Please enter a valid email address.';
        note.className = 'waitlist-note error';
        emailInput.focus();
        return;
      }

      // Simulate submission — replace with your real endpoint (e.g. fetch to Formspree, Resend, Supabase, your API)
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Saving…';

      setTimeout(() => {
        form.classList.add('success');
        note.textContent = `✓ You're in. We'll be in touch at ${email}.`;
        note.className = 'waitlist-note success';
        emailInput.value = email;
        emailInput.setAttribute('readonly', 'true');
        btn.innerHTML = 'Saved';
        btn.style.background = 'var(--green-2)';
      }, 600);

      // To wire up to a real backend, replace the setTimeout block above with something like:
      //
      // fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      //   .then(r => r.ok ? r.json() : Promise.reject(r))
      //   .then(() => { form.classList.add('success'); note.textContent = `✓ You're in. We'll be in touch at ${email}.`; note.className = 'waitlist-note success'; })
      //   .catch(() => { note.textContent = 'Something went wrong. Try again in a moment.'; note.className = 'waitlist-note error'; btn.disabled = false; btn.innerHTML = originalHTML; });
    });

    // Clear error state on typing
    emailInput.addEventListener('input', () => {
      if (note.classList.contains('error')) {
        note.textContent = 'No spam. One email when your spot opens.';
        note.className = 'waitlist-note';
      }
    });
  }
