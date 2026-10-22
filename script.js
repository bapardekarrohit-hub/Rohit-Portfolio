// Loader
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('done'), 600));

// Typed role text
const words = ['insights.', 'predictions.', 'dashboards.', 'working products.'];
const typedEl = document.getElementById('typed');
let w = 0, c = 0, del = false;
(function type() {
  const word = words[w];
  typedEl.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else if (c > 0) c--;
  else { del = false; w = (w + 1) % words.length; }
  setTimeout(type, del ? 40 : 90);
})();

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .15 });
window.bindReveal = (el, i = 0) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  io.observe(el);
};
document.querySelectorAll('.reveal').forEach((el, i) => window.bindReveal(el, i));

// Count-up stats
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let n = 0;
    const t = setInterval(() => {
      n++; el.textContent = n + '+';
      if (n >= target) clearInterval(t);
    }, Math.max(60, Math.round(1200 / Math.max(1, target))));
    countIO.unobserve(el);
  });
}, { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

// Scroll progress, nav state, parallax, active link
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
const ghost = document.querySelector('.ghost');
const photo = document.getElementById('photoWrap');
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.links a')];
window.addEventListener('scroll', () => {
  const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (y / h * 100) + '%';
  nav.classList.toggle('scrolled', y > 40);
  if (y < 800) { ghost.style.transform = `translate(-50%, ${y * .18}px)`; }
  let cur = sections[0].id;
  sections.forEach(s => { if (y + 200 >= s.offsetTop) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

// Cursor glow
const glow = document.getElementById('glow');
window.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

// 3D tilt on cards
window.bindTilt = card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
};
document.querySelectorAll('.tilt').forEach(window.bindTilt);

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

// Mobile menu
const burger = document.getElementById('burger'), links = document.getElementById('links');
burger.addEventListener('click', () => { burger.classList.toggle('open'); links.classList.toggle('open'); });
links.addEventListener('click', () => { burger.classList.remove('open'); links.classList.remove('open'); });


// ---- Big name: letters rise one by one
(function () {
  const n = document.querySelector('.big-name');
  if (!n) return;
  const t = n.textContent.trim();
  n.textContent = '';
  [...t].forEach((ch, i) => {
    const sp = document.createElement('span');
    sp.className = 'ch'; sp.textContent = ch; sp.setAttribute('aria-hidden', 'true');
    sp.style.animationDelay = (0.9 + i * 0.09) + 's';
    n.append(sp);
  });
})();

// ---- Hero: floating network of dots that reacts to the cursor
(function () {
  const cv = document.getElementById('net');
  if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d');
  let w = 0, h = 0, pts = [], vis = true, raf = null;
  const mouse = { x: -999, y: -999 };
  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(46, Math.max(16, w / 24)));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: 1 + Math.random() * 1.6 }));
  }
  function step() {
    if (!vis) { raf = null; return; }
    ctx.clearRect(0, 0, w, h);
    const maxd = Math.max(60, w * .14);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d > 0 && d < 90) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < maxd) {
          ctx.strokeStyle = 'rgba(255,255,255,' + (.24 * (1 - d / maxd)).toFixed(3) + ')';
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(step);
  }
  new IntersectionObserver(e => { vis = e[0].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(step); }).observe(cv);
  const card = cv.parentElement;
  card.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  card.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  window.addEventListener('resize', size);
  size(); raf = requestAnimationFrame(step);
})();

// ---- Cards: light follows the cursor
document.addEventListener('pointermove', e => {
  const t = e.target.closest && e.target.closest('.card,.project,.cert,.t-item');
  if (!t) return;
  const r = t.getBoundingClientRect();
  t.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  t.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

// ---- Timeline line fills as you scroll; back-to-top button
(function () {
  const tl = document.querySelector('.timeline');
  const top = document.getElementById('toTop');
  function update() {
    if (tl) {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height));
      tl.style.setProperty('--tl', p.toFixed(3));
    }
    if (top) top.classList.toggle('show', window.scrollY > 700);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  if (top) top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
})();
