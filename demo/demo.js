/* ════════════════════════════════════════════════════════════
   Timeless — Demo pages shared behavior
   - Starfield + cursor glow + nav scroll + reveal (from index.html)
   - Personalization via ?hotel= / ?nombre= / ?negocio= (cold email)
   - Chat player with realistic "typing…" indicator
   ════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Personalization from URL (?hotel= is what W2 appends) ── */
  function getBizName() {
    const p = new URLSearchParams(window.location.search);
    const raw = p.get('hotel') || p.get('nombre') || p.get('negocio') || p.get('biz');
    if (!raw) return null;
    try { return decodeURIComponent(raw).trim().slice(0, 60); }
    catch (_) { return raw.trim().slice(0, 60); }
  }

  function applyPersonalization() {
    const biz = getBizName();
    if (!biz) return;
    // badge
    const badge = document.getElementById('badge-text');
    if (badge) badge.textContent = 'Demo para ' + biz;
    // any element flagged data-biz gets the business name injected
    document.querySelectorAll('[data-biz]').forEach(el => { el.textContent = biz; });
    // <title>
    document.title = biz + ' — Demo Timeless';
  }

  /* ── Chat player ──────────────────────────────────────────────
     Reads the .vm bubbles already in the DOM, hides them, then
     reveals them one by one. Before each assistant (.vm.a) bubble
     it shows a typing indicator for a beat — feels like a real chat. */
  function initChat() {
    const msgsBox = document.querySelector('.vc-msgs');
    if (!msgsBox) return;
    const bubbles = Array.from(msgsBox.querySelectorAll('.vm'));
    const avatarInitial = (document.body.dataset.assistantInitial || 'E');

    function makeTyping() {
      const wrap = document.createElement('div');
      wrap.className = 'vm a typing-row';
      wrap.innerHTML =
        '<div class="vm-av">' + avatarInitial + '</div>' +
        '<div class="typing"><span></span><span></span><span></span></div>';
      return wrap;
    }

    function play() {
      // reset
      bubbles.forEach(b => { b.style.display = 'none'; b.style.opacity = '0'; b.style.transform = 'translateY(8px)'; });
      msgsBox.querySelectorAll('.typing-row').forEach(t => t.remove());

      let delay = 350;
      bubbles.forEach((b) => {
        const isAssistant = b.classList.contains('a');
        if (isAssistant) {
          // show typing, then the bubble
          setTimeout(() => {
            const t = makeTyping();
            msgsBox.insertBefore(t, b);
            scrollDown();
          }, delay);
          delay += 850;
          setTimeout(() => {
            const t = msgsBox.querySelector('.typing-row');
            if (t) t.remove();
            reveal(b);
          }, delay);
          delay += 550;
        } else {
          setTimeout(() => reveal(b), delay);
          delay += 700;
        }
      });

      // show replay button at the end
      const replay = document.querySelector('.replay');
      if (replay) {
        replay.style.opacity = '0';
        setTimeout(() => { replay.style.transition = 'opacity .4s'; replay.style.opacity = '1'; }, delay);
      }
    }

    function reveal(b) {
      b.style.display = 'flex';
      requestAnimationFrame(() => {
        b.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        b.style.opacity = '1';
        b.style.transform = 'none';
        scrollDown();
      });
    }
    function scrollDown() { msgsBox.scrollTop = msgsBox.scrollHeight; }

    const replayBtn = document.querySelector('.replay');
    if (replayBtn) replayBtn.addEventListener('click', play);

    // play when the stage scrolls into view (or immediately if already visible)
    const stage = document.querySelector('.demo-stage');
    if (stage && 'IntersectionObserver' in window) {
      let played = false;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !played) { played = true; play(); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(stage);
    } else {
      setTimeout(play, 600);
    }
  }

  /* ── Nav scroll border ── */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reveal on scroll ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }

  /* ── Cursor glow ── */
  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
    let cx = -999, cy = -999, tx = -999, ty = -999;
    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function tick() {
      cx += (tx - cx) * 0.09; cy += (ty - cy) * 0.09;
      glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
      requestAnimationFrame(tick);
    })();
  }

  /* ── Starfield (parallax, 3 depth layers) — from index.html ── */
  function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];
    const LAYERS = [
      { parallax: 0.04, count: 110, rMax: 0.7, opMax: 0.35, gold: 0.08 },
      { parallax: 0.13, count: 70,  rMax: 1.1, opMax: 0.55, gold: 0.14 },
      { parallax: 0.28, count: 36,  rMax: 1.7, opMax: 0.75, gold: 0.22 },
    ];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function create() {
      stars = [];
      LAYERS.forEach(L => {
        for (let i = 0; i < L.count; i++) stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * L.rMax + 0.2,
          baseOp: Math.random() * L.opMax * 0.6 + 0.04,
          tSpeed: Math.random() * 0.007 + 0.002,
          phase: Math.random() * Math.PI * 2,
          parallax: L.parallax,
          gold: Math.random() < L.gold,
        });
      });
    }
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H); frame++;
      const sY = window.scrollY;
      stars.forEach(s => {
        const tw = Math.sin(frame * s.tSpeed + s.phase);
        const a = Math.max(0.03, s.baseOp + tw * 0.18);
        const dy = ((s.y - sY * s.parallax) % H + H) % H;
        ctx.beginPath(); ctx.arc(s.x, dy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold ? 'rgba(200,145,43,' + a + ')' : 'rgba(240,230,211,' + a + ')';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize(); create(); draw();
    window.addEventListener('resize', () => { resize(); create(); }, { passive: true });
  }

  /* ── Propagate ?hotel= param onto CTA links so onboarding/Calendly
        keep the context from the cold email ── */
  function propagateParamToCtas() {
    const search = window.location.search;
    if (!search) return;
    document.querySelectorAll('[data-keep-param]').forEach(a => {
      try {
        const u = new URL(a.href);
        new URLSearchParams(search).forEach((v, k) => u.searchParams.set(k, v));
        a.href = u.toString();
      } catch (_) {}
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyPersonalization();
    initNav();
    initReveal();
    initCursorGlow();
    initStarfield();
    initChat();
    propagateParamToCtas();
  });
})();
