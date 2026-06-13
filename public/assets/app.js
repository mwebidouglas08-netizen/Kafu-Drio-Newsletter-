/* ═══════════════════════════════════════════════
   KAFU DRIO NEWSLETTER — APP.JS
   Scroll reveal · Active nav · Count-up · Back-to-top · Mobile menu
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ───────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.rv').forEach((el) => revealObserver.observe(el));

  /* ── 2. ACTIVE NAV HIGHLIGHT ────────────────── */
  const navLinks = document.querySelectorAll('.nl');
  const sections = Array.from(navLinks)
    .map((l) => {
      const id = l.getAttribute('href').replace('#', '');
      return document.getElementById(id);
    })
    .filter(Boolean);

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const active = document.querySelector(
            `.nl[href="#${entry.target.id}"]`
          );
          if (active) {
            active.classList.add('active');
            // Scroll the active link into view in the nav bar
            active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      });
    },
    { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach((s) => navObserver.observe(s));

  /* ── 3. SMOOTH SCROLL for nav links ─────────── */
  document.querySelectorAll('.nl, .nav-mobile a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        // Close mobile menu first
        document.getElementById('nav-mobile').classList.remove('open');
        document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
        setTimeout(() => {
          const offset = document.getElementById('site-nav').offsetHeight + 8;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 80);
      }
    });
  });

  /* ── 4. MOBILE NAV TOGGLE ───────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-nav')) {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 5. COUNT-UP ANIMATION for cover stats ──── */
  const statEls = document.querySelectorAll('.cs-n[data-target]');

  const countObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        statEls.forEach((el) => {
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        });
        countObserver.disconnect();
      }
    },
    { threshold: 0.6 }
  );

  const statsContainer = document.querySelector('.cover-stats');
  if (statsContainer) countObserver.observe(statsContainer);

  /* ── 6. BACK TO TOP BUTTON ──────────────────── */
  const btt = document.getElementById('btt');

  if (btt) {
    window.addEventListener(
      'scroll',
      () => {
        btt.classList.toggle('show', window.scrollY > 600);
      },
      { passive: true }
    );

    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 7. COVER PARALLAX (subtle) ─────────────── */
  const coverBg = document.querySelector('.cover-bg');
  if (coverBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          coverBg.style.transform = `scale(1.05) translateY(${y * 0.18}px)`;
        }
      },
      { passive: true }
    );
  }

  /* ── 8. PHOTO LIGHTBOX (simple) ─────────────── */
  // Create lightbox overlay
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = [
    'display:none',
    'position:fixed',
    'inset:0',
    'background:rgba(0,0,0,0.92)',
    'z-index:9999',
    'align-items:center',
    'justify-content:center',
    'cursor:zoom-out',
    'padding:2rem',
  ].join(';');

  const lbImg = document.createElement('img');
  lbImg.style.cssText = [
    'max-width:90vw',
    'max-height:90vh',
    'object-fit:contain',
    'border-radius:8px',
    'box-shadow:0 20px 80px rgba(0,0,0,0.6)',
    'display:block',
    'margin:auto',
  ].join(';');

  const lbClose = document.createElement('button');
  lbClose.textContent = '×';
  lbClose.setAttribute('aria-label', 'Close image');
  lbClose.style.cssText = [
    'position:fixed',
    'top:1.25rem',
    'right:1.5rem',
    'background:rgba(200,146,42,0.9)',
    'border:none',
    'color:#0c3b2a',
    'font-size:28px',
    'font-weight:700',
    'width:44px',
    'height:44px',
    'border-radius:50%',
    'cursor:pointer',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'line-height:1',
  ].join(';');

  lb.appendChild(lbImg);
  lb.appendChild(lbClose);
  document.body.appendChild(lb);

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.style.display = 'none';
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  // Attach to all content images (exclude logos, icons, portraits)
  const clickableImgs = document.querySelectorAll(
    '.photo-2col img, .fa-photos img, .chart-fig img, .wide-fig img, ' +
    '.pc-photos img, .fa-list .aw-portrait, .grants-docs img, ' +
    '.cs-photos img, .mandate-photo-row img, .ac-img, .pubs-media > img'
  );

  clickableImgs.forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── 9. LAZY IMAGE FADE-IN ───────────────────── */
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach((img) => {
    img.style.transition = 'opacity 0.4s ease';
    img.style.opacity = img.complete ? '1' : '0';
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
  });

  /* ── 10. STICKY NAV SHADOW on scroll ────────── */
  const siteNav = document.getElementById('site-nav');
  window.addEventListener(
    'scroll',
    () => {
      if (siteNav) {
        siteNav.style.boxShadow =
          window.scrollY > 80
            ? '0 4px 24px rgba(12,59,42,0.3)'
            : '0 4px 20px rgba(12,59,42,0.25)';
      }
    },
    { passive: true }
  );

})();
