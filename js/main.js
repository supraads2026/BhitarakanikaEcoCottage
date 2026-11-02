/* Bhitarkanika Eco Cottage — site script
   ------------------------------------------------------------------
   EDIT HERE: phone numbers, social links and boat prices per ghat.
   ------------------------------------------------------------------ */
const SITE = {
  whatsapp: "919937076645",            // WhatsApp number with country code, no +
  phone1: "+919937076645", phone1Label: "99370 76645",
  phone2: "+919437076645", phone2Label: "94370 76645",
  instagram: "https://www.instagram.com/bhitarkanikaecocottage/",
  facebook: "https://www.facebook.com/bhitarkanikaecocottage",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Bhitarkanika+Eco+Cottage+Kasturikona+Ghat+Chandbali",
};

// Boat fare per ghat. Put a number (₹ per boat) in `price`, or leave null for "On request".
const GHATS = [
  { name: "Kasturikona Ghat",  price: null, info: "Right at our cottage — the easiest start." },
  { name: "Chandbali",          price: null, info: "Main town jetty on the Baitarani river." },
  { name: "Khola Check Gate",   price: null, info: "Main park entry gate towards Dangmal." },
  { name: "Jai Nagar Ghat",     price: null, info: "Quieter creek routes." },
  { name: "Dhamara",            price: null, info: "Near the Dhamra river mouth." },
];

/* ------------------------------------------------------------------ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const inr = n => "₹" + Number(n).toLocaleString("en-IN");
const waLink = msg => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3A22 22 0 0 0 14.6 2C12.2 2 10.6 3.5 10.6 6.1v2.4H8v3.4h2.6V22H14V11.9h2.7l.4-3.4H14Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>',
  bird: '<svg viewBox="0 0 40 16"><path d="M1 6 Q10 -2 20 9 Q30 -2 39 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
};
const WAVE = '<div class="wave" aria-hidden="true"><svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path fill="currentColor" opacity=".45" d="M0 50 C240 10 480 90 720 55 S1200 10 1440 45 V90 H0Z"/><path fill="currentColor" d="M0 62 C260 30 520 95 760 65 S1220 30 1440 62 V90 H0Z"/></svg></div>';

/* ---------- Shared header / footer ---------- */
const PAGES = [
  ["index.html", "Home"], ["cottages.html", "Cottages"], ["experiences.html", "Experiences"],
  ["boat-safari.html", "Boat Safari"], ["packages.html", "Packages"], ["bhitarkanika.html", "The Park"],
  ["gallery.html", "Gallery"], ["contact.html", "Contact"],
];
const current = document.body.dataset.page || "index.html";

function renderChrome() {
  const header = $("#site-header");
  if (header) header.outerHTML = `
  <div class="progress" aria-hidden="true"></div>
  <header class="nav" id="nav">
    <div class="nav__inner">
      <a href="index.html" class="brand" aria-label="Bhitarkanika Eco Cottage — home">
        <img src="assets/logo-mark.svg" alt="" width="42" height="42">
        <span class="brand__text">Bhitarkanika<small>Eco Cottage</small></span>
      </a>
      <nav class="nav__links" aria-label="Main">
        ${PAGES.map(([h, l]) => `<a href="${h}"${h === current ? ' aria-current="page"' : ""}>${l}</a>`).join("")}
      </nav>
      <div class="nav__cta">
        <a class="btn btn--outline" href="${waLink("Namaskar! I'd like to book a stay at Bhitarkanika Eco Cottage.")}" target="_blank" rel="noopener">Book Now</a>
        <button class="nav__toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

  const footer = $("#site-footer");
  if (footer) footer.outerHTML = `
  <footer class="footer">
    <canvas class="fireflies" data-count="40"></canvas>
    <div class="container footer__grid">
      <div>
        <a href="index.html" class="brand"><img src="assets/logo-mark.svg" alt="" width="44" height="44"><span class="brand__text">Bhitarkanika<small>Eco Cottage</small></span></a>
        <p class="footer__tag">Where the Mangroves Whisper</p>
        <p>A small, family-run riverside stay at the gateway of Bhitarkanika National Park.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul class="footer__links">${PAGES.slice(1).map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h4>Visit</h4>
        <p>Kasturikona Ghat, Chandbali,<br>Kasturikana, Odisha 756132</p>
        <p><a href="${SITE.mapsLink}" target="_blank" rel="noopener">Open in Google Maps →</a></p>
      </div>
      <div>
        <h4>Contact</h4>
        <p>WhatsApp / Call<br><a href="tel:${SITE.phone1}">${SITE.phone1Label}</a><br>Call: <a href="tel:${SITE.phone2}">${SITE.phone2Label}</a></p>
        <div class="social">
          <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
          <a href="${waLink("Namaskar!")}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>
        </div>
      </div>
    </div>
    <div class="container footer__copy">
      <span>© ${new Date().getFullYear()} Bhitarkanika Eco Cottage · bhitarkanikaecocottage.com</span>
      <span>Park closed to visitors 1 May – 31 July every year</span>
    </div>
  </footer>
  <a href="${waLink("Namaskar! I have a question about Bhitarkanika Eco Cottage.")}" class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.wa}<span class="wa-float__tip">Chat with us</span></a>
  <button class="to-top" aria-label="Back to top">↑</button>
  <div class="mobile-bar">
    <a href="tel:${SITE.phone1}">Call</a>
    <a href="${waLink("Namaskar!")}" target="_blank" rel="noopener">WhatsApp</a>
    <a href="boat-safari.html#book" class="mobile-bar__book">Book a Boat</a>
  </div>`;

  // generic WhatsApp links: <a class="js-wa" data-msg="...">
  $$(".js-wa").forEach(a => { a.href = waLink(a.dataset.msg || "Namaskar!"); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-wave]").forEach(el => el.insertAdjacentHTML("beforeend", WAVE.replace('class="wave"', `class="wave ${el.dataset.wave}"`)));
  $$("[data-icon]").forEach(el => el.insertAdjacentHTML("afterbegin", ICON[el.dataset.icon] || ""));
}

/* ---------- Page load & page-to-page transitions ---------- */
function pageTransitions() {
  requestAnimationFrame(() => setTimeout(() => document.documentElement.classList.add("is-loaded"), reduceMotion ? 0 : 450));
  window.addEventListener("pageshow", e => { if (e.persisted) document.documentElement.classList.remove("is-leaving"); });
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
    if (url.pathname === location.pathname) return; // same-page anchor
    e.preventDefault();
    document.documentElement.classList.add("is-leaving");
    setTimeout(() => (location.href = url.href), reduceMotion ? 0 : 520);
  });
}

/* ---------- Header behaviour ---------- */
function header() {
  const nav = $("#nav"); if (!nav) return;
  const toggle = $(".nav__toggle", nav), bar = $(".progress"), top = $(".to-top");
  let last = 0, ticking = false;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("is-solid", y > 60);
    nav.classList.toggle("is-hidden", y > last && y > 400 && !document.body.classList.contains("nav-open"));
    last = y;
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    if (top) top.classList.toggle("is-visible", y > 800);
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$(".nav__links a").forEach(a => a.addEventListener("click", () => { document.body.classList.remove("nav-open"); document.body.style.overflow = ""; }));
  top?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Scroll reveal, counters, parallax ---------- */
function reveal() {
  $$("[data-stagger]").forEach(p => [...p.children].forEach((c, i) => {
    c.classList.add("reveal"); c.style.setProperty("--d", `${i * (+p.dataset.stagger || 0.12)}s`);
  }));
  const els = $$(".reveal, .reveal--mask");
  if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(e => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  els.forEach(e => io.observe(e));
}

function counters() {
  const els = $$("[data-count]");
  const run = el => {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 0), suf = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = end.toLocaleString("en-IN", { minimumFractionDigits: dec }) + suf; return; }
    const t0 = performance.now(), dur = 2200;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = (end * e).toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }), { threshold: .6 });
  els.forEach(e => io.observe(e));
}

function parallax() {
  const els = $$("[data-parallax]");
  if (!els.length || reduceMotion) return;
  let ticking = false;
  const update = () => {
    const vh = innerHeight;
    els.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();
}

/* ---------- Nature effects: flying birds & fireflies ---------- */
function birds() {
  $$(".birds").forEach(box => {
    const n = +(box.dataset.n || 5);
    for (let i = 0; i < n; i++) {
      const b = document.createElement("span");
      b.className = "bird"; b.innerHTML = ICON.bird;
      const s = 0.5 + Math.random() * 0.8;
      b.style.cssText = `top:${8 + Math.random() * 35}%;width:${34 * s}px;height:${14 * s}px;animation-duration:${22 + Math.random() * 22}s;animation-delay:${-Math.random() * 30}s;opacity:${0.5 + s * 0.4}`;
      b.firstElementChild.style.animationDuration = `${0.45 + Math.random() * 0.4}s`;
      box.appendChild(b);
    }
  });
}

function fireflies() {
  if (reduceMotion) return;
  $$("canvas.fireflies").forEach(cv => {
    const ctx = cv.getContext("2d"), n = +(cv.dataset.count || 50);
    let w, h, dpr, flies = [], visible = false, raf;
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size(); addEventListener("resize", size);
    for (let i = 0; i < n; i++) flies.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 1.8, a: Math.random() * 6.28, s: .15 + Math.random() * .4, p: Math.random() * 6.28 });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flies) {
        f.a += (Math.random() - .5) * .2; f.p += .03;
        f.x = (f.x + Math.cos(f.a) * f.s + w) % w; f.y = (f.y + Math.sin(f.a) * f.s + h) % h;
        const glow = .35 + .65 * Math.abs(Math.sin(f.p));
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
        g.addColorStop(0, `rgba(240,220,140,${glow})`); g.addColorStop(1, "rgba(240,220,140,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 6, 0, 6.28); ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) draw(); }).observe(cv);
  });
}

/* ---------- Forms → WhatsApp ---------- */
function msg(form, text) { const m = $(".form-msg", form); if (m) m.textContent = text; }
function today() { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
function openWA(text) { window.open(waLink(text), "_blank", "noopener"); }

function stayForm() {
  const f = $("#stay-form"); if (!f) return;
  $$('input[type="date"]', f).forEach(i => (i.min = today()));
  f.in?.addEventListener("change", () => { f.out.min = f.in.value; });
  f.addEventListener("submit", e => {
    e.preventDefault();
    if (!f.in.value || !f.out.value) return msg(f, "Please choose your check-in and check-out dates.");
    if (f.out.value <= f.in.value) return msg(f, "Check-out must be after check-in.");
    msg(f, "");
    openWA(`Namaskar! I'd like to stay at Bhitarkanika Eco Cottage.\nCheck-in: ${f.in.value}\nCheck-out: ${f.out.value}\nGuests: ${f.guests.value}\nPlease share availability and rates.`);
  });
}

function boatForm() {
  const list = $("#ghatList"), sel = $("#ghatSelect"), fare = $("#fareBox"), f = $("#boat-form");
  const priceText = g => (g.price ? inr(g.price) + " / boat" : "On request");
  if (list) list.innerHTML = GHATS.map((g, i) => `<li data-i="${i}" tabindex="0" role="button"><div><b>${g.name}</b><br><small>${g.info}</small></div><span>${priceText(g)}</span></li>`).join("");
  $$(".ghat-cards").forEach(box => box.innerHTML = GHATS.map((g, i) => `
    <article class="fact"><div class="fact__icon">⚓</div><h3>${g.name}</h3><p>${g.info}</p>
    <p class="price" style="margin-top:14px">${priceText(g)}</p>
    <a class="link" href="#book" data-ghat="${i}">Book from here →</a></article>`).join(""));
  if (!f) return;
  sel.innerHTML = '<option value="">Choose a ghat…</option>' + GHATS.map((g, i) => `<option value="${i}">${g.name}</option>`).join("");
  f.date.min = today();
  const choose = i => {
    sel.value = i;
    const g = GHATS[i];
    $$("#ghatList li").forEach(li => li.classList.toggle("is-active", li.dataset.i == i));
    fare.innerHTML = g ? `Boat fare from <b>${g.name}</b>: <strong>${priceText(g)}</strong>${g.price ? "" : " — we'll confirm on WhatsApp"}` : "Select a ghat to see the fare";
    fare.classList.remove("pulse"); void fare.offsetWidth; fare.classList.add("pulse");
  };
  sel.addEventListener("change", () => choose(sel.value));
  list?.addEventListener("click", e => { const li = e.target.closest("li"); if (li) { choose(li.dataset.i); f.scrollIntoView({ behavior: "smooth", block: "center" }); } });
  list?.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.dataset.i) choose(e.target.dataset.i); });
  document.addEventListener("click", e => { const a = e.target.closest("[data-ghat]"); if (a) choose(a.dataset.ghat); });

  f.addEventListener("submit", e => {
    e.preventDefault();
    const bad = [];
    if (sel.value === "") bad.push(sel);
    if (!f.date.value) bad.push(f.date);
    if (!f.name.value.trim()) bad.push(f.name);
    $$("[aria-invalid]", f).forEach(x => x.removeAttribute("aria-invalid"));
    bad.forEach(x => x.setAttribute("aria-invalid", "true"));
    if (bad.length) return msg(f, "Please choose a ghat, a date and enter your name.");
    const d = new Date(f.date.value);
    if (d.getMonth() >= 4 && d.getMonth() <= 6) return msg(f, "The park is closed for boat safaris from 1 May to 31 July. Please pick another date.");
    msg(f, "");
    const g = GHATS[sel.value];
    openWA(`Namaskar! I'd like to book a boat safari.\nGhat: ${g.name}\nDate: ${f.date.value}\nTime: ${f.slot.value}\nGuests: ${f.guests.value}\nName: ${f.name.value.trim()}\nQuoted fare: ${priceText(g)}\nPlease confirm availability.`);
  });
}

function contactForm() {
  const f = $("#contact-form"); if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    if (!f.name.value.trim() || !f.message.value.trim()) return msg(f, "Please add your name and a message.");
    msg(f, "");
    openWA(`Namaskar! My name is ${f.name.value.trim()}.\nInterested in: ${f.topic.value}\n${f.message.value.trim()}`);
  });
}

/* ---------- Gallery filter + lightbox ---------- */
function gallery() {
  const items = $$(".masonry .m"); if (!items.length) return;
  $$(".filters button").forEach(btn => btn.addEventListener("click", () => {
    $$(".filters button").forEach(b => b.classList.toggle("is-active", b === btn));
    const k = btn.dataset.filter;
    items.forEach(m => m.classList.toggle("is-out", k !== "all" && m.dataset.cat !== k));
  }));
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<div><div class="lightbox__img"></div><p class="lightbox__cap"></p></div><button class="lightbox__close" aria-label="Close">×</button><button class="lightbox__prev" aria-label="Previous">‹</button><button class="lightbox__next" aria-label="Next">›</button>';
  document.body.appendChild(lb);
  let idx = 0;
  const vis = () => items.filter(m => !m.classList.contains("is-out"));
  const show = i => {
    const v = vis(); idx = (i + v.length) % v.length; const m = v[idx];
    $(".lightbox__img", lb).style.backgroundImage = m.firstElementChild.style.backgroundImage;
    $(".lightbox__cap", lb).textContent = m.dataset.caption || "";
    lb.classList.add("is-open");
  };
  items.forEach(m => { m.tabIndex = 0; m.addEventListener("click", () => show(vis().indexOf(m))); m.addEventListener("keydown", e => e.key === "Enter" && show(vis().indexOf(m))); });
  $(".lightbox__close", lb).onclick = () => lb.classList.remove("is-open");
  $(".lightbox__prev", lb).onclick = () => show(idx - 1);
  $(".lightbox__next", lb).onclick = () => show(idx + 1);
  lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("is-open"); });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") lb.classList.remove("is-open");
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}

/* ---------- Season calendar ---------- */
function calendar() {
  const box = $(".calendar"); if (!box) return;
  const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const S = ["best","best","good","ok","closed","closed","closed","ok","ok","good","best","best"];
  const I = ["🐦","🐢","🐢","☀️","🔒","🔒","🔒","🌧","🐊","🍃","🐦","🐦"];
  box.innerHTML = M.map((m, i) => `<div class="month m-${S[i]}" title="${m}"><i>${I[i]}</i>${m}</div>`).join("");
  box.setAttribute("data-stagger", ".05");
}

/* ---------- Boot ---------- */
renderChrome();
calendar();
pageTransitions();
header();
reveal();
counters();
parallax();
birds();
fireflies();
stayForm();
boatForm();
contactForm();
gallery();

/* ---------- Split-screen story: crossfade sticky media as chapters scroll ---------- */
(function story() {
  const box = $(".story"); if (!box) return;
  const media = $$(".story__media > div", box), chaps = $$(".chapter", box), count = $(".story__count", box);
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const i = chaps.indexOf(en.target);
    chaps.forEach((c, j) => c.classList.toggle("is-active", j === i));
    media.forEach((m, j) => m.classList.toggle("is-active", j === i));
    if (count) count.textContent = `0${i + 1} / 0${chaps.length}`;
  }), { threshold: 0.55 });
  chaps.forEach(c => io.observe(c));
})();
