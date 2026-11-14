/* Sandil Puthur — Portfolio 2026 */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = n => String(n).padStart(2, '0');
const rand = (a, b) => a + Math.random() * (b - a);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;

/* ---------------- data ---------------- */
const P = (cat, n, title, ar) => ({ src: `assets/${cat}/${pad(n)}.jpg`, title, ar: ar || 1 });
const WORK = {
  logos: [
    'Arcaailano','AFX','AV Designs','AJP Films','AV Designs with pen','Baba Land secondary','Capital Custodia circles',
    'Capital Custodia shield','Capital Custodia wordmark','Baba Land','CO3.co','Shield emblem','Farmley','Tour Travels',
    'iStream','Kings Drink','Media Bugs','Memory in Motion — camera','Memory in Motion — film strip','Memory in Motion — tripod',
    'Memory in Motion — MiM','Memory in Motion — M','Shell rebranding','Palm Tree Resort','SP Designs','SP Films','SP Mix','Zen'
  ].map((t, i) => P('logos', i + 1, t)),
  posters: [
    ["The Printer's Journal, white",.707],['Inaugural AI Summit',.707],["The Printer's Journal, black & white",.707],
    ["The Printer's Journal, yellow",.707],["The Printer's Journal, pink",.707],['Baba Land food poster',.707],
    ['Baba Land 35% off',.707],['Floral Blossom',.8],['Dance Meeting',.731],['Diēs Natālis, landscape',1.779],
    ['Diēs Natālis, hands',.8],['Diēs Natālis, releasing today',.8],['Diēs Natālis, 18 Dec',.8],
    ['Personal Dance Audition',.774],['Xception selection',.667],['Enliven invitation, green',.706],
    ['Enliven invitation, grey',.707],['Enliven 26 chief guest',.707],['Jhoom Saath, Ethnic Day',.8],
    ['Dance Reel Loaded',.712],['iStream OTT poster',.707],['Jhoom Saath, main events',.8],['SP Fashion illustration',.707],
    ['Graphic Dialogue, orange',.773],['Graphic Dialogue, black',.774],['Dance Reel Loaded winners',1],
    ['Xception Open Audition',.667],['Xception, Michael & Nagavalli',.8],['SJCC Youth Festival',1.776]
  ].map(([t, ar], i) => P('posters', i + 1, t, ar)),
  typography: [
    ['Tree · Rotate · Loud · History',.773],['Break · Swim · Grow · Flow · Echo · Twist',.74],['Sandy',1.6],['Think · Connect · Family',.774]
  ].map(([t, ar], i) => P('typography', i + 1, t, ar)),
  brochures: [
    'Capital Custodia website','Capital Custodia Instagram post 1','Capital Custodia Instagram post 2','Capital Custodia Instagram post 3',
    'Capital Custodia Instagram post 4','Capital Custodia Instagram post 5','Capital Custodia Instagram post 6'
  ].map((t, i) => P('brochures', i + 1, t)),
  cards: ['Baba Land card, front','Baba Land card, back','Stream card, front','Stream card, back'].map((t, i) => P('cards', i + 1, t)),
  book: ['Chaya storefront illustration','Chaya menu'].map((t, i) => P('book', i + 1, t))
};
const CAT = { logos:'Logos', posters:'Posters', typography:'Typography', brochures:'Brochures', cards:'Visiting Cards', book:'Book Menu' };

/* ---------------- torn paper edges ---------------- */
function tear(top) {
  const pts = []; let x = 0;
  while (x < 1000) { pts.push(`${x.toFixed(1)} ${rand(4, 40).toFixed(1)}`); x += rand(5, 24); }
  pts.push(`1000 ${rand(8, 36).toFixed(1)}`);
  const d = `M${pts.join(' L')} L1000 ${top ? 46 : 0} L0 ${top ? 46 : 0} Z`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 46' preserveAspectRatio='none'><path d='${d}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
document.documentElement.style.setProperty('--tearTop', tear(true));
document.documentElement.style.setProperty('--tearBot', tear(false));

/* ---------------- split text ---------------- */
$$('.split').forEach(el => {
  const t = el.textContent; el.textContent = '';
  [...t].forEach((c, i) => {
    const s = document.createElement('span'); s.className = 'ch';
    s.textContent = c === ' ' ? ' ' : c; s.style.transitionDelay = (i * 0.045) + 's';
    el.appendChild(s);
  });
});

/* ---------------- loader ---------------- */
(function loader() {
  const num = $('#loadNum'), L = $('.loader');
  const critical = ['assets/sandil.jpg', 'assets/logos/01.jpg'];
  let loaded = 0, shown = 0, done = false;
  critical.forEach(src => { const i = new Image(); i.onload = i.onerror = () => loaded++; i.src = src; });
  const t0 = performance.now();
  (function tick(now) {
    const timeP = clamp((now - t0) / 1300, 0, 1);
    const target = Math.min(timeP, (loaded / critical.length) * .4 + timeP * .6) * 100;
    shown += (target - shown) * .18;
    num.textContent = Math.round(shown);
    if ((timeP >= 1 && loaded >= critical.length) || now - t0 > 4000) {
      num.textContent = 100; finish(); return;
    }
    requestAnimationFrame(tick);
  })(t0);
  setTimeout(() => { num.textContent = 100; finish(); }, 2600);
  function finish() {
    if (done) return; done = true;
    setTimeout(() => {
      L.classList.add('done');
      document.body.classList.remove('loading');
      document.body.classList.add('ready');
      setTimeout(() => L.remove(), 1100);
    }, reduce ? 0 : 200);
  }
})();

/* ---------------- intersection reveals ---------------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in-view'); e.target.dispatchEvent(new Event('enter')); io.unobserve(e.target); }
}), { threshold: .18, rootMargin: '0px 0px -8% 0px' });
const watch = el => io.observe(el);

/* ---------------- turntable frame ---------------- */
(function spin() {
  const img = $('#spinImg'), name = $('#spinName'), tag = $('.frame .mono');
  const pool = [...WORK.logos.slice(0, 12).map(w => [w, 'Logo']), ...WORK.posters.filter((_, i) => i % 3 === 0).map(w => [w, 'Poster'])]
    .sort(() => Math.random() - .5);
  let i = 0;
  pool.forEach(([w]) => { const p = new Image(); p.src = w.src; });
  setInterval(() => {
    if (document.hidden || !document.querySelector('.about.live')) return;
    i = (i + 1) % pool.length;
    img.classList.add('flip');
    setTimeout(() => {
      img.src = pool[i][0].src; name.textContent = pool[i][0].title.split(',')[0]; tag.textContent = pool[i][1];
      img.classList.remove('flip');
    }, 300);
  }, 1600);
})();

/* ---------------- marquees ---------------- */
const words1 = ['SANDIL PUTHUR', 'GRAPHIC DESIGNER', 'ILLUSTRATOR', 'VISUAL MEDIA ARTIST', 'PORTFOLIO 2026'];
const glyph = ['✸', '✦', '♣'];
function fillTrack(track, words) {
  const html = words.map((w, i) => `<span>${w}<em>${glyph[i % 3]}</em></span>`).join('');
  track.innerHTML = html + html + html;
}
const m1 = $('.m1 .track'), m2 = $('.m2 .track');
fillTrack(m1, words1);
fillTrack(m2, ['LOGOS', 'POSTERS', 'TYPOGRAPHY', 'BROCHURES', 'VISITING CARDS', 'BOOK MENU']);
let mx1 = 0, mx2 = 0, vel = 0, lastY = scrollY, bandOn = false, mRaf = 0, w1 = 0, w2 = 0;
const band = $('.band');
function measureMarquee() { w1 = m1.scrollWidth / 3; w2 = m2.scrollWidth / 3; }
function marquee() {
  const dy = scrollY - lastY; lastY = scrollY;
  vel += (clamp(dy, -60, 60) * .3 - vel) * .1;
  const sp = reduce ? 0 : 1.1 + Math.abs(vel);
  mx1 = (mx1 - sp) % w1; mx2 = (mx2 + sp * .8) % w2;
  const sk = reduce ? 0 : clamp(vel, -14, 14).toFixed(2);
  m1.style.transform = `translate3d(${mx1.toFixed(1)}px,0,0) skewX(${-sk}deg)`;
  m2.style.transform = `translate3d(${(mx2 - w2).toFixed(1)}px,0,0) skewX(${sk}deg)`;
  mRaf = bandOn ? requestAnimationFrame(marquee) : 0;
}
// pause decorative animation for sections that are off screen
const liveIO = new IntersectionObserver(es => es.forEach(e => {
  e.target.classList.toggle('live', e.isIntersecting);
  if (e.target === band) {
    bandOn = e.isIntersecting;
    if (bandOn && !mRaf) { measureMarquee(); lastY = scrollY; mRaf = requestAnimationFrame(marquee); }
  }
}), { rootMargin: '100px 0px' });
[band, $('.about')].forEach(el => liveIO.observe(el));
measureMarquee();
addEventListener('load', measureMarquee);

/* ---------------- glass nav indicator ---------------- */
function blobber(container, blob, links, getActive) {
  let prev;
  function place(force) {
    const a = getActive();
    if (a === prev && force !== true) return;
    prev = a;
    links.forEach(l => l.classList.toggle('on', l === a));
    if (!a) { blob.style.opacity = 0; return; }
    blob.style.opacity = 1;
    blob.style.left = a.offsetLeft + 'px';
    blob.style.width = a.offsetWidth + 'px';
    if (container.scrollWidth > container.clientWidth) {
      container.scrollTo({ left: a.offsetLeft - container.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' });
    }
  }
  return place;
}
const navLinks = $$('.nav-links a');
const sections = navLinks.map(a => $(a.getAttribute('href')));
const navPlace = blobber($('.nav-links'), $('.nav-blob'), navLinks, () => {
  let act = null; const y = innerHeight * .4;
  sections.forEach((s, i) => { const r = s.getBoundingClientRect(); if (r.top < y && r.bottom > y) act = navLinks[i]; });
  return act;
});
const roomLinks = $$('.rooms a');
const rooms = roomLinks.map(a => $(a.getAttribute('href')));
let lastRoom = null;
const roomPlaceRaw = blobber($('.rooms'), $('.rooms-blob'), roomLinks, () => {
  let act = null; const y = innerHeight * .45;
  rooms.forEach((s, i) => { const r = s.getBoundingClientRect(); if (r.top < y && r.bottom > y) act = roomLinks[i]; });
  return act;
});
function roomPlace() {
  let act = null; const y = innerHeight * .45;
  rooms.forEach((s, i) => { const r = s.getBoundingClientRect(); if (r.top < y && r.bottom > y) act = i; });
  if (act !== lastRoom) { lastRoom = act; roomPlaceRaw(true); }
}

/* ---------------- 01 sticker bomb ---------------- */
const stickersEl = $('#stickers');
const stickerEls = WORK.logos.map((w, i) => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'stk'; b.dataset.cursor = fine ? 'Drag' : '';
  b.setAttribute('aria-label', 'View logo: ' + w.title);
  b.innerHTML = `<img src="${w.src}" alt="${w.title}" loading="lazy" draggable="false">`;
  stickersEl.appendChild(b);
  return b;
});
let zTop = 10;
function scatter(animate) {
  const W = stickersEl.clientWidth;
  const cols = W > 1100 ? 7 : W > 760 ? 6 : W > 520 ? 4 : 3;
  const rows = Math.ceil(stickerEls.length / cols);
  const cw = W / cols, ch = cw * .9;
  stickersEl.style.height = (rows * ch + 40) + 'px';
  const order = [...stickerEls.keys()].sort(() => Math.random() - .5);
  order.forEach((idx, k) => {
    const el = stickerEls[idx];
    const c = k % cols, r = Math.floor(k / cols);
    const s = Math.min(cw, ch) * rand(.78, 1.02);
    const shapes = ['50%', '22%', '14%', '30% 70% 70% 30% / 30% 30% 70% 70%'];
    const x = clamp(c * cw + (cw - s) / 2 + rand(-.2, .2) * cw, 0, W - s);
    const y = Math.max(0, r * ch + (ch - s) / 2 + rand(-.18, .18) * ch);
    el.style.setProperty('--s', s + 'px');
    el.style.setProperty('--r', shapes[Math.floor(rand(0, shapes.length))]);
    el.style.setProperty('--x', x + 'px');
    el.style.setProperty('--y', y + 'px');
    el.style.setProperty('--rot', rand(-16, 16).toFixed(1) + 'deg');
    el.style.zIndex = 1 + Math.floor(rand(0, 9));
    if (animate) { el.style.transitionDelay = (k * .025) + 's'; setTimeout(() => el.style.transitionDelay = '', 1600); }
  });
}
stickersEl.classList.add('hidden-init');
scatter(false);
stickersEl.addEventListener('enter', () => {
  stickerEls.forEach((el, k) => { el.style.transitionDelay = (k * .035) + 's'; setTimeout(() => el.style.transitionDelay = '', 2200); });
  stickersEl.classList.remove('hidden-init');
});
watch(stickersEl);
$('#shuffle').addEventListener('click', () => scatter(true));

stickerEls.forEach((el, i) => {
  let sx, sy, ox, oy, moved = 0, id = null;
  el.addEventListener('pointerdown', e => {
    if (!fine) return;
    id = e.pointerId; el.setPointerCapture(id); moved = 0;
    sx = e.clientX; sy = e.clientY;
    ox = parseFloat(el.style.getPropertyValue('--x')); oy = parseFloat(el.style.getPropertyValue('--y'));
    el.classList.add('drag'); el.style.zIndex = ++zTop;
  });
  el.addEventListener('pointermove', e => {
    if (id !== e.pointerId) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    moved = Math.max(moved, Math.hypot(dx, dy));
    el.style.setProperty('--x', ox + dx + 'px'); el.style.setProperty('--y', oy + dy + 'px');
    el.style.setProperty('--rot', clamp(dx * .05, -20, 20) + 'deg');
  });
  const up = e => {
    if (id !== e.pointerId) return;
    id = null; el.classList.remove('drag');
    const W = stickersEl.clientWidth, H = stickersEl.clientHeight, s = el.offsetWidth;
    el.style.setProperty('--x', clamp(parseFloat(el.style.getPropertyValue('--x')), -s * .3, W - s * .7) + 'px');
    el.style.setProperty('--y', clamp(parseFloat(el.style.getPropertyValue('--y')), -s * .3, H - s * .7) + 'px');
    el.style.setProperty('--rot', rand(-14, 14).toFixed(1) + 'deg');
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('click', () => { if (moved < 6) openLB('logos', i); });
});

/* ---------------- 02 poster wall ---------------- */
const wall = $('#wall'), postersRoom = $('#posters'), pin = $('.pin', postersRoom);
WORK.posters.forEach((w, i) => {
  const f = document.createElement('figure');
  f.className = 'poster'; f.dataset.cursor = 'View'; f.tabIndex = 0; f.setAttribute('role', 'button');
  f.setAttribute('aria-label', 'View poster: ' + w.title);
  f.style.setProperty('--rot', rand(-3.5, 3.5).toFixed(1) + 'deg'); f.style.setProperty('--ar', w.ar);
  f.innerHTML = `<img src="${w.src}" alt="${w.title}" loading="lazy"><figcaption>${pad(i + 1)} — ${w.title}</figcaption>`;
  f.addEventListener('click', () => openLB('posters', i));
  f.addEventListener('keydown', e => { if (e.key === 'Enter') openLB('posters', i); });
  wall.appendChild(f);
});
let wallDist = 0;
const WALL_SLOW = 1.6; // px of vertical scroll per px the wall slides: slower = every poster gets time on screen
function sizeWall() {
  wallDist = Math.max(0, wall.scrollWidth - document.documentElement.clientWidth);
  postersRoom.style.height = Math.ceil(pin.offsetHeight + wallDist * WALL_SLOW) + 'px';
}
function wallScroll() {
  const r = postersRoom.getBoundingClientRect();
  const total = postersRoom.offsetHeight - pin.offsetHeight;
  const p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  wall.style.transform = `translate3d(${(-p * wallDist).toFixed(1)}px,0,0)`;
  $('#wallBar').style.transform = `scaleX(${p})`;
  $('#posterNow').textContent = pad(Math.min(WORK.posters.length, 1 + Math.round(p * (WORK.posters.length - 1))));
}
// re-measure whenever the wall or the pinned frame changes size (fonts, images, rotation, browser bars)
if ('ResizeObserver' in window) {
  const ro = new ResizeObserver(() => { sizeWall(); wallScroll(); });
  ro.observe(wall); ro.observe(pin);
}

/* ---------------- 03 typography loupe ---------------- */
const specs = $('#specimens');
WORK.typography.forEach((w, i) => {
  const d = document.createElement('figure');
  d.className = 'spec reveal-up'; d.style.setProperty('--ar', w.ar); d.style.transitionDelay = (i * .1) + 's';
  d.tabIndex = 0; d.setAttribute('role', 'button'); d.setAttribute('aria-label', 'View typography: ' + w.title);
  d.innerHTML = `<img src="${w.src}" alt="${w.title}" loading="lazy"><figcaption class="spec-name">${w.title}</figcaption><div class="loupe"></div>`;
  specs.appendChild(d); watch(d);
  const img = $('img', d), lens = $('.loupe', d), Z = 2.4;
  lens.style.backgroundImage = `url("${w.src}")`;
  d.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const rd = d.getBoundingClientRect(), ri = img.getBoundingClientRect();
    const x = e.clientX - rd.left, y = e.clientY - rd.top;
    const ix = e.clientX - ri.left, iy = e.clientY - ri.top;
    lens.style.left = x + 'px'; lens.style.top = y + 'px';
    lens.style.backgroundSize = `${ri.width * Z}px ${ri.height * Z}px`;
    lens.style.backgroundPosition = `${-(ix * Z - 90)}px ${-(iy * Z - 90)}px`;
  });
  d.addEventListener('click', () => openLB('typography', i));
  d.addEventListener('keydown', e => { if (e.key === 'Enter') openLB('typography', i); });
});

/* ---------------- 04 brochures feed ---------------- */
const feed = $('#feed');
WORK.brochures.slice(1).forEach((w, k) => {
  const b = document.createElement('button');
  b.type = 'button'; b.dataset.cursor = 'View'; b.setAttribute('aria-label', 'View ' + w.title);
  b.innerHTML = `<img src="${w.src}" alt="${w.title}" loading="lazy">`;
  b.addEventListener('click', () => openLB('brochures', k + 1));
  feed.appendChild(b);
});

/* ---------------- 05 flip cards ---------------- */
const cardsBox = $('#cardsBox');
[['Baba Land', 0], ['Stream', 2]].forEach(([name, k]) => {
  const wrap = document.createElement('div'); wrap.className = 'vcard-wrap reveal-up';
  wrap.innerHTML = `
    <div class="vcard" role="button" tabindex="0" aria-label="Flip the ${name} card" data-cursor="Flip">
      <div class="vcard-in">
        <div class="vface front"><img src="${WORK.cards[k].src}" alt="${WORK.cards[k].title}" loading="lazy"></div>
        <div class="vface back"><img src="${WORK.cards[k + 1].src}" alt="${WORK.cards[k + 1].title}" loading="lazy"></div>
      </div>
    </div>
    <div class="vcard-meta"><span>${name}</span><button class="glass" type="button">View full size</button></div>`;
  cardsBox.appendChild(wrap); watch(wrap);
  const card = $('.vcard', wrap);
  const flip = () => card.classList.toggle('flipped');
  card.addEventListener('click', flip);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  $('.vcard-meta button', wrap).addEventListener('click', () => openLB('cards', k + (card.classList.contains('flipped') ? 1 : 0)));
  if (fine) {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 12}deg)`;
      $$('.vface', card).forEach(f => f.style.setProperty('--sheen', (px + .5) * 100 + '%'));
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  }
});

/* ---------------- 04/06 buttons with data-cat ---------------- */
$$('[data-cat]').forEach(b => { b.dataset.cursor = b.dataset.cat === 'book' ? 'Open' : 'View'; b.addEventListener('click', () => openLB(b.dataset.cat, +b.dataset.i)); });

/* ---------------- generic reveals ---------------- */
$$('.reveal-up:not(.hero .reveal-up), .reveal-pop, .split, .polaroids, #bookEl').forEach(watch);

/* ---------------- lightbox ---------------- */
const lb = $('#lb'), lbImg = $('#lbImg');
let cur = { cat: 'logos', i: 0 };
function render() {
  const list = WORK[cur.cat], w = list[cur.i];
  lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
  lbImg.src = w.src; lbImg.alt = w.title;
  $('#lbTitle').textContent = w.title;
  $('#lbMeta').textContent = `${CAT[cur.cat]} · ${pad(cur.i + 1)} / ${pad(list.length)}`;
}
function openLB(cat, i) { cur = { cat, i }; render(); if (!lb.open) lb.showModal(); }
function step(d) { const n = WORK[cur.cat].length; cur.i = (cur.i + d + n) % n; render(); }
$('#lbPrev').addEventListener('click', () => step(-1));
$('#lbNext').addEventListener('click', () => step(1));
$('#lbClose').addEventListener('click', () => lb.close());
lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-stage')) lb.close(); });
addEventListener('keydown', e => {
  if (!lb.open) return;
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});
let tx = null;
lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
});

/* ---------------- copy email + toast ---------------- */
const toast = $('#toast');
function say(t) { toast.textContent = t; toast.classList.add('show'); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove('show'), 2200); }
$('#copyMail').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('sandilputhur@gmail.com'); say('Email copied ✦'); }
  catch { say('sandilputhur@gmail.com'); }
});

/* ---------------- liquid glass cursor ---------------- */
if (fine && !reduce) {
  const c = $('.cursor'), label = $('.cursor-label');
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; c.classList.add('on'); }, { passive: true });
  document.addEventListener('pointerleave', () => c.classList.remove('on'));
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor], a, button, .mega-o');
    if (t && t.closest('.spec')) { c.classList.remove('big'); c.style.opacity = 0; return; }
    c.style.opacity = '';
    const lab = t ? (t.dataset.cursor || (t.classList.contains('mega-o') ? 'Hi!' : '')) : '';
    c.classList.toggle('big', !!lab);
    label.textContent = lab;
    c.style.width = c.style.height = c.style.margin = '';
    if (t && !lab) { c.style.width = c.style.height = '52px'; c.style.margin = '-26px 0 0 -26px'; }
  });
  let cRaf = 0;
  function loop() {
    cx += (x - cx) * .22; cy += (y - cy) * .22;
    const d = Math.hypot(x - cx, y - cy);
    const v = Math.min(d / 60, .45);
    const ang = Math.atan2(y - cy, x - cx) * 180 / Math.PI;
    c.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) rotate(${ang.toFixed(1)}deg) scale(${(1 + v).toFixed(3)},${(1 - v * .6).toFixed(3)})`;
    cRaf = d > .3 ? requestAnimationFrame(loop) : 0;
  }
  addEventListener('pointermove', () => { if (!cRaf) cRaf = requestAnimationFrame(loop); }, { passive: true });
}

/* ---------------- scroll + resize ---------------- */
let ticking = false;
function onScroll() {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => { ticking = false; wallScroll(); navPlace(); roomPlace(); });
}
addEventListener('scroll', onScroll, { passive: true });
let rw = innerWidth;
addEventListener('resize', () => {
  sizeWall(); wallScroll(); navPlace(true); lastRoom = undefined; roomPlace(); measureMarquee();
  if (Math.abs(innerWidth - rw) > 40) { rw = innerWidth; scatter(false); }
});
addEventListener('load', () => { sizeWall(); onScroll(); });
sizeWall(); wallScroll(); navPlace(); roomPlace();
})();
