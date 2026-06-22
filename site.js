/* FJS Holding — shared site behaviour (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollBehavior = prefersReduced ? 'auto' : 'smooth';

  /* ---------- Sticky nav state ---------- */
  var nav = document.querySelector('.nav');
  function onNavScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  // Interior pages keep the solid nav permanently
  if (nav && nav.dataset.solid === 'true') {
    nav.classList.add('scrolled');
  } else if (nav) {
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  /* ---------- Mobile drawer ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var drawer = document.querySelector('.drawer');
  var closeBtn = drawer && drawer.querySelector('.close');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    if (closeBtn) closeBtn.focus();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
  }
  if (menuBtn && drawer) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeDrawer();
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Back-to-top button ---------- */
  var toTop = document.createElement('button');
  toTop.type = 'button';
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  });
  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) toTop.classList.add('show');
    else toTop.classList.remove('show');
  }, { passive: true });

  /* ---------- Services quick-nav: active-section highlighting ---------- */
  var qnLinks = document.querySelectorAll('.svc-quicknav .qn');
  if (qnLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    qnLinks.forEach(function (l) {
      var id = l.getAttribute('href');
      if (id && id.charAt(0) === '#') byId[id.slice(1)] = l;
    });
    function setActive(id) {
      qnLinks.forEach(function (l) { l.classList.remove('active'); });
      if (byId[id]) byId[id].classList.add('active');
    }
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    document.querySelectorAll('.svc[id], .svc-cat[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Projects: filtering + lightbox ---------- */
  var gallery = document.querySelector('.pcard-grid');
  if (gallery) {
    var cards = Array.prototype.slice.call(gallery.querySelectorAll('.pcard'));
    var filterBtns = document.querySelectorAll('.filter-btn');
    var emptyMsg = document.querySelector('.proj-empty');

    function applyFilter(cat) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = (cat === 'all' || card.getAttribute('data-cat') === cat);
        if (match) { card.hidden = false; shown++; } else { card.hidden = true; }
      });
      if (emptyMsg) emptyMsg.style.display = shown ? 'none' : 'block';
    }
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    /* ----- Lightbox — two modes:
         project mode  (data-gallery present): scoped prev/next within that project's photos
         album mode    (no data-gallery):      chains all visible album/curated figures      ----- */
    var figures = Array.prototype.slice.call(document.querySelectorAll('.pcard-fig'));
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Project image viewer');
    lb.setAttribute('aria-hidden', 'true');
    lb.innerHTML =
      '<button class="lb-btn lb-close" type="button" aria-label="Close image viewer">&times;</button>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous image">&#8249;</button>' +
      '<button class="lb-btn lb-next" type="button" aria-label="Next image">&#8250;</button>' +
      '<figure><img alt=""><video controls playsinline preload="none"></video><figcaption><b></b><span></span></figcaption></figure>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbVideo = lb.querySelector('video');
    var lbTitle = lb.querySelector('figcaption b');
    var lbBlurb = lb.querySelector('figcaption span');
    var visible = [];
    var current = 0;
    var lastFocused = null;
    var gallerySrcs = null; // null = album mode; string[] = project-scoped mode

    function isVideoSrc(src) { return /\.mp4$/i.test(src); }
    function setMedia(src, alt) {
      if (isVideoSrc(src)) {
        lbImg.style.display = 'none';
        lbVideo.style.display = '';
        if (lbVideo.src !== src) { lbVideo.src = src; lbVideo.load(); }
      } else {
        lbVideo.style.display = 'none';
        lbVideo.pause();
        lbImg.style.display = '';
        lbImg.src = src;
        lbImg.alt = alt || '';
      }
    }
    function show(i) {
      if (gallerySrcs) {
        if (!gallerySrcs.length) return;
        current = (i + gallerySrcs.length) % gallerySrcs.length;
        setMedia(gallerySrcs[current], lbTitle.textContent);
      } else {
        if (!visible.length) return;
        current = (i + visible.length) % visible.length;
        var fig = visible[current];
        var img = fig.querySelector('img');
        var src = fig.getAttribute('data-full') || img.currentSrc || img.src;
        lbTitle.textContent = fig.getAttribute('data-title') || '';
        lbBlurb.textContent = fig.getAttribute('data-blurb') || '';
        setMedia(src, img.alt || '');
      }
    }
    function openLightbox(fig) {
      var galleryAttr = fig.getAttribute('data-gallery');
      lastFocused = document.activeElement;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      if (galleryAttr) {
        try { gallerySrcs = JSON.parse(galleryAttr); } catch (e) { gallerySrcs = []; }
        lbTitle.textContent = fig.getAttribute('data-title') || '';
        lbBlurb.textContent = fig.getAttribute('data-blurb') || '';
        current = 0;
        setMedia(gallerySrcs[0] || '', lbTitle.textContent);
      } else {
        gallerySrcs = null;
        visible = figures.filter(function (f) {
          var card = f.closest('.pcard');
          return !card || !card.hidden;
        });
        var idx = visible.indexOf(fig);
        if (idx < 0) idx = 0;
        show(idx);
      }
      lb.querySelector('.lb-close').focus();
    }
    function closeLightbox() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      lbVideo.pause();
      lbVideo.src = '';
      gallerySrcs = null;
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    figures.forEach(function (fig) {
      fig.addEventListener('click', function () { openLightbox(fig); });
      fig.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(fig); }
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- FAQ: keep one panel open at a time (progressive enhancement) ---------- */
  var faqItems = document.querySelectorAll('.faq-list details');
  faqItems.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        faqItems.forEach(function (other) {
          if (other !== d) other.open = false;
        });
      }
    });
  });

  /* ---------- Contact form: Formspree submit + validation + mailto fallback ---------- */
  // TODO: replace YOUR_FORM_ID below with your real Formspree form ID
  //       (create a form at https://formspree.io → e.g. https://formspree.io/f/abcdwxyz).
  //       Until a real ID is set, the form gracefully falls back to opening the
  //       visitor's email client (mailto) so no enquiry is ever lost.
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
  var FALLBACK_EMAIL = 'sales@fjsholding.co.za';

  var form = document.getElementById('contactForm');
  if (form) {
    // With JS present we drive validation ourselves; native validation stays
    // as the no-JS fallback (attribute is only added when this script runs).
    form.setAttribute('novalidate', 'novalidate');
    var statusEl = form.querySelector('.status');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var rules = {
      name:    { required: true, msg: 'Please enter your name.' },
      email:   { required: true, email: true, msg: 'Please enter your email address.',
                 emailMsg: 'Please enter a valid email address.' },
      message: { required: true, min: 10, msg: 'Please describe your project.',
                 minMsg: 'Please add a little more detail (at least 10 characters).' }
    };

    function fieldWrap(input) { return input.closest('.field'); }
    function errEl(name) { return form.querySelector('#err-' + name); }

    function validateField(name) {
      var input = form.elements[name];
      if (!input) return true;
      var rule = rules[name];
      if (!rule) return true;
      var val = (input.value || '').trim();
      var error = '';
      if (rule.required && !val) error = rule.msg;
      else if (rule.email && val && !emailRe.test(val)) error = rule.emailMsg;
      else if (rule.min && val.length < rule.min) error = rule.minMsg;

      var wrap = fieldWrap(input);
      var ee = errEl(name);
      if (error) {
        if (wrap) wrap.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
        if (ee) ee.textContent = error;
        return false;
      }
      if (wrap) wrap.classList.remove('invalid');
      input.setAttribute('aria-invalid', 'false');
      if (ee) ee.textContent = '';
      return true;
    }

    function validateAll() {
      var ok = true, firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (!validateField(name)) { ok = false; if (!firstBad) firstBad = form.elements[name]; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }

    // Re-validate a field once it's been touched
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener('blur', function () { validateField(name); });
      input.addEventListener('input', function () {
        if (fieldWrap(input) && fieldWrap(input).classList.contains('invalid')) validateField(name);
      });
    });

    function setStatus(type, html) {
      if (!statusEl) return;
      statusEl.className = 'status show ' + type;
      statusEl.innerHTML = html;
      statusEl.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
    }

    function buildMailto() {
      var d = new FormData(form);
      var subject = encodeURIComponent('Website enquiry — ' + (d.get('service') || 'General'));
      var body = encodeURIComponent(
        'Name: ' + (d.get('name') || '') + '\n' +
        'Company: ' + (d.get('company') || '') + '\n' +
        'Email: ' + (d.get('email') || '') + '\n' +
        'Phone: ' + (d.get('phone') || '') + '\n' +
        'Discipline: ' + (d.get('service') || '') + '\n\n' +
        (d.get('message') || '')
      );
      return 'mailto:' + FALLBACK_EMAIL + '?subject=' + subject + '&body=' + body;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) statusEl.className = 'status';
      if (!validateAll()) {
        setStatus('error', 'Please correct the highlighted fields and try again.');
        return;
      }

      // Formspree not configured yet → graceful mailto fallback
      if (FORMSPREE_ENDPOINT.indexOf('YOUR_FORM_ID') !== -1 || !window.fetch) {
        window.location.href = buildMailto();
        setStatus('ok', 'Opening your email app with the details ready to send. ' +
          'If nothing happens, email us at <a href="mailto:' + FALLBACK_EMAIL + '">' + FALLBACK_EMAIL + '</a>.');
        form.reset();
        return;
      }

      // Real submission via Formspree
      form.classList.add('sending');
      if (statusEl) setStatus('ok', 'Sending your enquiry…');
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        form.classList.remove('sending');
        if (res.ok) {
          setStatus('ok', 'Thanks — your enquiry has been sent. We\'ll be in touch shortly.');
          form.reset();
        } else {
          return res.json().then(function (data) {
            var m = (data && data.errors) ? data.errors.map(function (x) { return x.message; }).join(', ') : '';
            throw new Error(m || 'Submission failed');
          });
        }
      }).catch(function () {
        form.classList.remove('sending');
        setStatus('error', 'Something went wrong sending your message. Please email us directly at ' +
          '<a href="' + buildMailto() + '">' + FALLBACK_EMAIL + '</a> or call 061 424 3723.');
      });
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================
   CINEMATIC LAYER — isolated IIFE, no global pollution.
   All modules: dependency-free, defer-friendly, reduced-motion aware.
   ============================================================ */
(function () {
  'use strict';
  var doc = document;
  var html = doc.documentElement;
  var win = window;
  var prefersReduced = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = win.matchMedia && win.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Preloader: hide on load, hard-capped, skippable ---------- */
  (function preloader() {
    var pre = doc.querySelector('.preloader');
    if (!pre) return;
    if (prefersReduced) { pre.parentNode && pre.parentNode.removeChild(pre); return; }
    var hidden = false;
    function hide() {
      if (hidden) return;
      hidden = true;
      pre.classList.add('gone');
      setTimeout(function () {
        if (pre.parentNode) pre.parentNode.removeChild(pre);
      }, 650);
    }
    if (doc.readyState === 'complete') {
      setTimeout(hide, 280);
    } else {
      win.addEventListener('load', function () { setTimeout(hide, 220); });
    }
    setTimeout(hide, 1800); // hard cap so a hung asset never blocks the page
    var skip = pre.querySelector('.pre-skip');
    if (skip) skip.addEventListener('click', hide);
  })();

  /* ---------- Scroll-progress bar (rAF-throttled) ---------- */
  (function scrollProg() {
    var bar = doc.querySelector('.scroll-prog .bar');
    if (!bar) return;
    var raf = null;
    function update() {
      raf = null;
      var docEl = doc.documentElement;
      var sh = docEl.scrollHeight - win.innerHeight;
      var pct = sh > 0 ? Math.max(0, Math.min(1, (win.pageYOffset || docEl.scrollTop) / sh)) : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
    }
    win.addEventListener('scroll', function () {
      if (raf === null) raf = win.requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* ---------- Hero word-by-word headline reveal ---------- */
  (function heroLight() {
    var hero = doc.querySelector('.hero-cine');
    if (!hero) return;
    var fire = function () { hero.classList.add('lit'); };
    if (prefersReduced) { fire(); return; }
    // Wait until preloader gone OR ~250ms past DOMContentLoaded
    var delay = doc.querySelector('.preloader') ? 700 : 220;
    setTimeout(function () { win.requestAnimationFrame(fire); }, delay);
  })();

  /* ---------- Hero slideshow: crossfade through project photos on every page with .hero-slide ---------- */
  (function heroSlideshow() {
    var slides = doc.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;        // nothing to cycle (single image / none)
    if (prefersReduced) return;           // honour reduced-motion — stay on the first slide
    var i = 0;
    var INTERVAL = 3000;
    var timer = null;
    function advance() {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }
    function start() { if (!timer) timer = win.setInterval(advance, INTERVAL); }
    function stop() { if (timer) { win.clearInterval(timer); timer = null; } }
    start();
    // Pause while the tab is hidden, resume on return
    doc.addEventListener('visibilitychange', function () {
      if (doc.hidden) stop(); else start();
    });
  })();

  /* ---------- Optional hero video (only if user uncomments sources) ---------- */
  (function heroVideo() {
    var v = doc.querySelector('.hero-video');
    if (!v) return;
    if (prefersReduced) { v.parentNode && v.parentNode.removeChild(v); return; }
    if (!v.querySelector('source')) return; // no sources → leave inert
    v.addEventListener('canplay', function () { v.classList.add('ready'); }, { once: true });
    v.addEventListener('error', function () { v.parentNode && v.parentNode.removeChild(v); });
    try {
      var p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* autoplay blocked — keep static poster image */ });
      }
    } catch (e) { /* no-op */ }
  })();

  /* ---------- Hero Canvas: particle/wireframe network in brand colours ---------- */
  (function heroCanvas() {
    if (prefersReduced) return;
    var c = doc.querySelector('.hero-canvas');
    if (!c || typeof c.getContext !== 'function') return;
    var ctx = c.getContext('2d');
    if (!ctx) return;

    var dpr = Math.min(win.devicePixelRatio || 1, 2);
    var W = 0, H = 0;
    var pts = [];
    var raf = null;
    var visible = true;
    var running = false;

    function resize() {
      var r = c.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function makePoints() {
      var area = W * H;
      var density = win.innerWidth < 700 ? 32000 : 22000;
      var n = Math.max(30, Math.min(80, Math.round(area / density)));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.20,
          vy: (Math.random() - 0.5) * 0.20,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }
    function step() {
      if (!visible) { running = false; return; }
      ctx.clearRect(0, 0, W, H);
      var i, j, p;
      // update positions
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0)   { p.x = 0; p.vx *= -1; }
        if (p.x > W)   { p.x = W; p.vx *= -1; }
        if (p.y < 0)   { p.y = 0; p.vy *= -1; }
        if (p.y > H)   { p.y = H; p.vy *= -1; }
      }
      // lines (wireframe)
      var MAXD = win.innerWidth < 700 ? 120 : 170;
      var MAXD2 = MAXD * MAXD;
      var grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, '#2A8FCB');
      grad.addColorStop(1, '#2E7D52');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      for (i = 0; i < pts.length; i++) {
        for (j = i + 1; j < pts.length; j++) {
          var dx = pts[i].x - pts[j].x;
          var dy = pts[i].y - pts[j].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < MAXD2) {
            ctx.globalAlpha = (1 - d2 / MAXD2) * 0.32;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      // nodes
      ctx.globalAlpha = 0.78;
      ctx.fillStyle = '#7cc6f0';
      for (var k = 0; k < pts.length; k++) {
        p = pts[k];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = win.requestAnimationFrame(step);
    }
    function start() {
      if (running) return;
      running = true;
      raf = win.requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      if (raf) { win.cancelAnimationFrame(raf); raf = null; }
    }

    resize(); makePoints();
    c.classList.add('ready');

    var rTimer = null;
    win.addEventListener('resize', function () {
      clearTimeout(rTimer);
      rTimer = setTimeout(function () { resize(); makePoints(); }, 120);
    }, { passive: true });

    if ('IntersectionObserver' in win) {
      var io = new win.IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0 });
      io.observe(c);
    } else {
      start();
    }
    doc.addEventListener('visibilitychange', function () {
      if (doc.hidden) stop();
      else if (visible) start();
    });
  })();

  /* ---------- Interactive Three Disciplines ---------- */
  (function discX() {
    var section = doc.querySelector('.discx');
    if (!section) return;
    var tabs = section.querySelectorAll('.discx-tab');
    var reels = section.querySelectorAll('.discx-reel');
    if (!tabs.length || !reels.length) return;

    // Tag each reel with has-N so CSS knows which animation to run
    reels.forEach(function (r) {
      var n = r.querySelectorAll('.reel-imgs img').length;
      r.classList.add('has-' + Math.max(1, Math.min(3, n)));
    });

    function activate(name) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === name;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      reels.forEach(function (r) {
        var on = r.getAttribute('data-tab') === name;
        r.classList.toggle('active', on);
        r.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
    }

    var hoverTimer = null;
    tabs.forEach(function (t) {
      var name = t.getAttribute('data-tab');
      t.addEventListener('click', function () { activate(name); });
      t.addEventListener('focusin', function () { activate(name); });
      if (canHover) {
        t.addEventListener('mouseenter', function () {
          clearTimeout(hoverTimer);
          hoverTimer = setTimeout(function () { activate(name); }, 80);
        });
      }
    });
  })();

  /* ---------- Horizontal showcase: prev/next + edge state ---------- */
  (function hShow() {
    var section = doc.querySelector('.hshow');
    if (!section) return;
    var track = section.querySelector('.hshow-track');
    var prev = section.querySelector('.hshow-prev');
    var next = section.querySelector('.hshow-next');
    if (!track) return;
    var smooth = prefersReduced ? 'auto' : 'smooth';

    function cardStep() {
      var card = track.querySelector('.hshow-card');
      if (!card) return Math.round(track.clientWidth * 0.8);
      var styles = win.getComputedStyle(track);
      var gap = parseFloat(styles.columnGap || styles.gap || '20') || 20;
      return Math.round(card.getBoundingClientRect().width + gap);
    }
    function step(dir) {
      track.scrollBy({ left: dir * cardStep(), behavior: smooth });
    }
    function updateBtns() {
      if (!prev || !next) return;
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= max;
    }
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', function () {
      win.requestAnimationFrame(updateBtns);
    }, { passive: true });
    win.addEventListener('resize', updateBtns, { passive: true });
    updateBtns();
  })();

  /* ---------- Mobile drawer accordion (Divisions groups) ---------- */
  (function drawerAccordion() {
    var groups = doc.querySelectorAll('.drawer-group');
    if (!groups.length) return;
    groups.forEach(function (g) {
      var btn = g.querySelector('.drawer-toggle');
      if (!btn) return;
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function () {
        var open = g.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  })();

  /* ---------- Divisions mega-menu (click + Esc; hover/focus handled by CSS) ---------- */
  (function megaMenu() {
    var wrap = doc.querySelector('.has-mega');
    if (!wrap) return;
    var trigger = wrap.querySelector('.mega-trigger');
    var mega = wrap.querySelector('.nav-mega');
    if (!trigger || !mega) return;
    function open() { mega.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); }
    function close() { mega.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (mega.classList.contains('open')) close(); else open();
    });
    wrap.addEventListener('mouseenter', open);
    wrap.addEventListener('mouseleave', close);
    wrap.addEventListener('focusin', open);
    wrap.addEventListener('focusout', function (e) {
      if (!wrap.contains(e.relatedTarget)) close();
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mega.classList.contains('open')) { close(); trigger.focus(); }
    });
  })();

  /* ---------- Segmented tabs (e.g. solar market segments) ---------- */
  (function segTabs() {
    var groups = doc.querySelectorAll('[data-segtabs]');
    if (!groups.length) return;
    groups.forEach(function (group) {
      var tabs = group.querySelectorAll('.seg-tab');
      var panels = group.querySelectorAll('.seg-panel');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var id = tab.getAttribute('aria-controls');
          tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
          panels.forEach(function (p) { p.classList.toggle('active', p.id === id); });
        });
      });
    });
  })();

  /* ---------- Page-fade link transitions (internal HTML pages) ---------- */
  (function pageFade() {
    if (prefersReduced) return;
    var fade = doc.querySelector('.page-fade');
    if (!fade) return;
    doc.body.addEventListener('click', function (e) {
      var a = e.target && e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      if (a.target && a.target === '_blank') return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.hasAttribute('download')) return;
      var href = a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' ||
          href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 ||
          href.indexOf('javascript:') === 0) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      // Same page (anchor or no hash to current path): let browser handle
      if (url.pathname === location.pathname) return;
      // Only transition for .html pages and root
      if (!/\.html$/.test(url.pathname) && url.pathname !== '/' && !/\/$/.test(url.pathname)) return;
      e.preventDefault();
      fade.classList.add('on');
      setTimeout(function () { location.href = a.href; }, 280);
    });
    win.addEventListener('pageshow', function (ev) {
      if (ev.persisted) fade.classList.remove('on');
    });
    // Initial entrance — hide if any class is on
    requestAnimationFrame(function () { fade.classList.remove('on'); });
  })();

  /* ---------- Stats count-up on view ---------- */
  (function countUp() {
    if (!('IntersectionObserver' in win)) return;
    var els = doc.querySelectorAll('[data-count]');
    if (!els.length) return;
    var io = new win.IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        if (prefersReduced) {
          el.textContent = (el.getAttribute('data-count') || '') + (el.getAttribute('data-suffix') || '');
          return;
        }
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1500;
        var startT = performance.now();
        function frame(now) {
          var t = Math.min(1, (now - startT) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          var val = Math.round(target * eased);
          el.textContent = val + suffix;
          if (t < 1) win.requestAnimationFrame(frame);
        }
        win.requestAnimationFrame(frame);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Section divider draw-on (.bp-line, .topo-divider) ---------- */
  (function dividers() {
    if (!('IntersectionObserver' in win)) return;
    var els = doc.querySelectorAll('.bp-line, .topo-divider');
    if (!els.length) return;
    var io = new win.IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- Cinematic photo grade: bloom from graded → natural on view ---------- */
  (function cineGrade() {
    if (prefersReduced) return;
    var els = doc.querySelectorAll('.cine-grade');
    if (!els.length) return;
    if ('IntersectionObserver' in win) {
      var io = new win.IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('lit'); io.unobserve(e.target); }
        });
      }, { threshold: 0.18 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('lit'); });
    }
  })();

  /* ---------- Lazy parallax (subtle, transform-only) ---------- */
  (function parallax() {
    if (prefersReduced) return;
    var els = doc.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    var raf = null;
    function update() {
      raf = null;
      var vh = win.innerHeight;
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        var center = r.top + r.height / 2;
        var ratio = (center - vh / 2) / vh; // -~1 to ~1
        var amount = parseFloat(el.getAttribute('data-parallax')) || 20;
        el.style.transform = 'translate3d(0,' + (ratio * amount).toFixed(2) + 'px,0)';
      }
    }
    win.addEventListener('scroll', function () {
      if (raf === null) raf = win.requestAnimationFrame(update);
    }, { passive: true });
    win.addEventListener('resize', function () {
      if (raf === null) raf = win.requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* ---------- Hero content: gentle fade-up as you scroll away ---------- */
  (function heroScrollFade() {
    if (prefersReduced) return;
    var inner = doc.querySelector('.hero-cine .hero-inner');
    if (!inner) return;
    var cue = doc.querySelector('.hero-cine .scroll-cue');
    var cueFreed = false;
    var raf = null;
    function update() {
      raf = null;
      var p = Math.min(1, Math.max(0, win.scrollY / (win.innerHeight * 0.75)));
      inner.style.opacity = String(1 - p * 0.85);
      inner.style.transform = 'translateY(' + (p * 46).toFixed(1) + 'px)';
      if (cue && p > 0 && !cueFreed) {
        // release the entrance animation so inline opacity can take over
        cue.style.animation = 'none';
        cueFreed = true;
      }
      if (cue && cueFreed) cue.style.opacity = String(Math.max(0, 1 - p * 2.2));
    }
    win.addEventListener('scroll', function () {
      if (raf === null) raf = win.requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  /* ---------- Gentle 3D tilt on showcase media & the division stage ---------- */
  (function tilt() {
    if (prefersReduced || !canHover) return;
    var els = doc.querySelectorAll('.hshow-media, .discx-stage');
    if (!els.length) return;
    els.forEach(function (el) {
      var raf = null, rx = 0, ry = 0;
      function apply() {
        raf = null;
        el.style.transform =
          'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      }
      el.addEventListener('mouseenter', function () { el.classList.remove('tilt-return'); });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        ry = ((e.clientX - r.left) / r.width - 0.5) * 4.5;
        rx = (0.5 - (e.clientY - r.top) / r.height) * 3.5;
        if (raf === null) raf = win.requestAnimationFrame(apply);
      });
      el.addEventListener('mouseleave', function () {
        el.classList.add('tilt-return');
        rx = 0; ry = 0;
        if (raf === null) raf = win.requestAnimationFrame(apply);
      });
    });
  })();

})();
