// Renders projects & certificates from data.js, powers the certificate viewer and the contact form.
// No login anywhere. Supabase (optional) is used ONLY to save contact-form messages.
(function () {
  const cfg = window.PORTFOLIO_CONFIG || {};
  // Accept a URL pasted with extra path/slash (e.g. .../rest/v1/) and keep only https://xxxx.supabase.co
  function cleanUrl(u) { try { return new URL(String(u || '').trim()).origin; } catch (e) { return ''; } }
  const supaUrl = cleanUrl(cfg.SUPABASE_URL), supaKey = String(cfg.SUPABASE_ANON_KEY || '').trim();
  const configured = !!(supaUrl && supaKey && window.supabase);
  const sb = configured ? window.supabase.createClient(supaUrl, supaKey) : null;

  const DATA = window.PORTFOLIO_DATA || { projects: [], certificates: [] };

  // Only allow http(s) links or files inside /assets (blocks javascript: URLs etc.)
  function safeUrl(u) {
    if (!u) return '';
    u = String(u).trim();
    if (/^https?:\/\//i.test(u)) return u;
    if (/^assets\/[\w\-./ %]+$/i.test(u)) return u;
    return '';
  }
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function link(text, href) {
    const a = el('a', null, text);
    a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
    return a;
  }
  function activate(node, i) {
    if (window.bindTilt && node.classList.contains('tilt')) window.bindTilt(node);
    if (window.bindReveal) window.bindReveal(node, i);
  }

  // ---------- Projects ----------
  function renderProjects(list) {
    const grid = document.getElementById('projectGrid');
    grid.replaceChildren();
    list.forEach((p, i) => {
      const card = el('article', 'project tilt reveal');
      card.append(el('div', 'p-num', String(i + 1).padStart(2, '0')), el('h3', null, p.title), el('p', null, p.description));
      const chips = el('div', 'chips');
      (p.tech || []).forEach(t => chips.append(el('span', null, t)));
      card.append(chips);
      const live = safeUrl(p.live_url), gh = safeUrl(p.github_url);
      if (live || gh) {
        const links = el('div', 'p-links');
        if (live) links.append(link('Live ↗', live));
        if (gh) links.append(link('GitHub ↗', gh));
        card.append(links);
      }
      grid.append(card);
      activate(card, i);
    });
  }

  // ---------- Certificates (grouped by category with filter tabs) ----------
  const CATEGORIES = ['Job Simulations', 'Internships', 'Certifications', 'Workshops'];
  const ICONS = { 'Job Simulations': '💼', 'Internships': '🧑‍💻', 'Certifications': '🎓', 'Workshops': '🛠️' };
  let activeCat = 'All';
  function renderCerts() {
    const all = (DATA.certificates || []).filter(Boolean); // ignores accidental empty entries (like a double comma)
    const bar = document.getElementById('certFilters');
    bar.replaceChildren();
    ['All'].concat(CATEGORIES).forEach(cat => {
      const n = cat === 'All' ? all.length : all.filter(c => c.category === cat).length;
      const b = el('button', 'filter' + (cat === activeCat ? ' on' : ''), cat + ' (' + n + ')');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(cat === activeCat));
      b.addEventListener('click', () => { activeCat = cat; renderCerts(); });
      bar.append(b);
    });
    const grid = document.getElementById('certGrid');
    grid.replaceChildren();
    const list = activeCat === 'All' ? all : all.filter(c => c.category === activeCat);
    if (!list.length) { grid.append(el('p', 'cert-empty', 'Coming soon.')); return; }
    list.forEach((c, i) => {
      const card = el('button', 'cert tilt reveal');
      card.type = 'button';
      card.setAttribute('aria-label', 'View: ' + c.title);
      const top = el('div', 'cert-top');
      top.append(el('span', 'cert-icon', ICONS[c.category] || '🎓'), el('span', 'cert-cat', c.category || 'Certificate'));
      card.append(top, el('span', 'cert-date', c.issued_on || ''), el('h3', null, c.title), el('p', 'cert-issuer', c.issuer),
        el('span', 'cert-cta', 'View details ↗'));
      card.addEventListener('click', () => openCert(c));
      grid.append(card);
      activate(card, i);
    });
  }

  const modal = document.getElementById('certModal');
  const modalBody = document.getElementById('certModalBody');
  let lastFocus = null;
  function openCert(c) {
    lastFocus = document.activeElement;
    modalBody.replaceChildren();
    modalBody.append(el('h3', null, c.title), el('p', 'cert-issuer', [c.category, c.issuer, c.issued_on].filter(Boolean).join(' · ')));
    if (c.description) modalBody.append(el('p', 'cert-desc', c.description));
    const file = safeUrl(c.file_url);
    if (file) {
      if (/\.pdf(\?|#|$)/i.test(file)) {
        // Phones/tablets often show a blank box for embedded PDFs, so they get an "Open" button instead.
        const touch = window.matchMedia('(pointer: coarse)').matches;
        if (touch) {
          modalBody.append(el('p', 'cert-desc', 'Tap the button below to open this certificate.'));
        } else {
          const f = el('iframe', 'cert-frame'); f.src = file; f.title = c.title; modalBody.append(f);
        }
      } else if (/\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(file)) {
        const img = el('img', 'cert-img'); img.src = file; img.alt = c.title; modalBody.append(img);
      }
    } else {
      modalBody.append(el('p', 'cert-missing', 'The certificate file will be added here soon.'));
    }
    const actions = el('div', 'cert-actions');
    if (file) { const o = link('Open certificate ↗', file); if (window.matchMedia('(pointer: coarse)').matches) o.className = 'btn'; actions.append(o); }
    const cred = safeUrl(c.credential_url);
    if (cred) actions.append(link('Verify credential ↗', cred));
    if (actions.children.length) modalBody.append(actions);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close').focus();
  }
  function closeCert() {
    modal.hidden = true;
    modalBody.replaceChildren();
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) closeCert(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeCert(); });

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(form);
    if (fd.get('website')) return; // honeypot: bots fill this hidden field
    const name = String(fd.get('name') || '').trim(), email = String(fd.get('email') || '').trim(), message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) { status.textContent = 'Please fill in all fields.'; return; }
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; status.textContent = 'Sending…';
    if (!sb) {
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      location.href = 'mailto:bapardekarrohit@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + name) + '&body=' + body;
      status.textContent = 'Opening your email app…'; btn.disabled = false; return;
    }
    const { error } = await sb.from('messages').insert({ name, email, message });
    if (error) { status.textContent = 'Could not send. Please email me directly.'; }
    else { status.textContent = 'Thanks! Your message was sent.'; form.reset(); }
    btn.disabled = false;
  });

  // ---------- Load ----------
  renderProjects((DATA.projects || []).filter(Boolean));
  renderCerts();
  const sc = document.getElementById('statCerts'); if (sc) sc.dataset.count = (DATA.certificates || []).filter(Boolean).length;
  const sw = document.getElementById('statWorkshops'); if (sw) sw.dataset.count = (DATA.certificates || []).filter(c => c && c.category === 'Workshops').length;
})();
