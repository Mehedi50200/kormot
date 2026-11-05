import { initHero } from "./three-hero.js";
import { applyI18n, getLang, setLang, t } from "./i18n.js";

let heroInstance = null;

/* =========================================================
   helpers
   ========================================================= */
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

function waitForGSAP() {
  return new Promise((resolve) => {
    let tries = 0;
    (function check() {
      if (window.gsap && window.ScrollTrigger) return resolve();
      if (tries++ > 200) return resolve(); // give up gracefully after ~3s
      requestAnimationFrame(check);
    })();
  });
}

/* =========================================================
   custom cursor
   ========================================================= */
function initCursor() {
  if (!hasFinePointer) return;
  const cursor = $(".cursor");
  const dot = $(".cursor__dot");
  const ring = $(".cursor__ring");
  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  }, { passive: true });

  (function render() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  })();

  const hoverTargets = "a, button, [data-magnetic], [data-tilt], .product, .service, .step, .quote, .case__link";
  document.addEventListener("pointerover", (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.add("is-hover");
  });
  document.addEventListener("pointerout", (e) => {
    if (e.target.closest(hoverTargets)) cursor.classList.remove("is-hover");
  });
  window.addEventListener("pointerdown", () => cursor.classList.add("is-down"));
  window.addEventListener("pointerup", () => cursor.classList.remove("is-down"));
}

/* =========================================================
   magnetic buttons
   ========================================================= */
function initMagnetic() {
  if (!hasFinePointer || reduced) return;
  $$("[data-magnetic]").forEach((el) => {
    const strength = 0.35;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "translate(0, 0)";
    });
  });
}

/* =========================================================
   split text into chars/words
   ========================================================= */
function splitTitle(el) {
  const text = el.textContent;
  el.textContent = "";
  el.setAttribute("aria-label", text);
  // Complex scripts (e.g. Bangla) use combining marks/conjuncts that break when
  // split per character — animate those by whole word instead.
  const complexScript = /[\u0980-\u09FF]/.test(text);
  const frag = document.createDocumentFragment();
  const words = text.split(" ");
  // split into words so characters never break across lines
  words.forEach((word, wi) => {
    const wordEl = document.createElement("span");
    wordEl.className = "word";
    wordEl.setAttribute("aria-hidden", "true");
    if (complexScript) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = word;
      wordEl.appendChild(span);
    } else {
      for (const ch of word) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        wordEl.appendChild(span);
      }
    }
    frag.appendChild(wordEl);
    if (wi < words.length - 1) frag.appendChild(document.createTextNode(" "));
  });
  el.appendChild(frag);
  return $$(".char", el);
}

/* =========================================================
   counters
   ========================================================= */
function animateCount(el) {
  const text = el.dataset.text;
  if (text) { el.textContent = text; return; }
  const target = parseFloat(el.dataset.stat || "0");
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const start = performance.now();
  function frame(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = (target * eased).toFixed(decimals);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* =========================================================
   preloader
   ========================================================= */
function runPreloader() {
  return new Promise((resolve) => {
    const pre = $("#preloader");
    const bar = $(".preloader__bar i");
    const counter = $("[data-count]");
    const letters = $$(".preloader__word span");

    if (reduced) {
      pre.style.display = "none";
      resolve();
      return;
    }

    const gsap = window.gsap;
    const tl = gsap.timeline({ onComplete: resolve });
    tl.to(letters, { y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05 });

    const counterObj = { v: 0 };
    tl.to(counterObj, {
      v: 100, duration: 1.3, ease: "power1.inOut",
      onUpdate() {
        const v = Math.round(counterObj.v);
        if (counter) counter.textContent = v;
        if (bar) bar.style.width = v + "%";
      },
    }, 0.2);

    tl.to(".preloader__inner", { y: -20, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.15");
    tl.to(pre, {
      yPercent: -100, duration: 0.8, ease: "expo.inOut",
      onStart() { pre.classList.add("is-done"); },
    }, "-=0.1");
  });
}

/* =========================================================
   hero intro animation
   ========================================================= */
function heroIntro() {
  const gsap = window.gsap;
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.to(".reveal-line", { opacity: 1, duration: 0.6 }, 0)
    .fromTo(".hero__title .w", { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 0.05)
    .to(".hero__lede", { opacity: 1, y: 0, duration: 0.9 }, 0.4)
    .to(".hero__actions", { opacity: 1, y: 0, duration: 0.9 }, 0.55)
    .add(() => $$("[data-stat]", $("#heroStats")).forEach(animateCount), 0.7);
}

/* =========================================================
   scroll-triggered animations
   ========================================================= */
function initScrollAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  // nav state
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => $("#nav").classList.toggle("is-scrolled", self.scroll() > 80),
    onToggle: (self) => $("#nav").classList.toggle("is-scrolled", self.isActive || self.scroll() > 80),
  });
  // simpler: track scroll directly
  window.addEventListener("scroll", () => {
    $("#nav").classList.toggle("is-scrolled", window.scrollY > 80);
  }, { passive: true });

  // scroll progress bar
  const progress = $(".scroll-progress i");
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => { if (progress) progress.style.width = (self.progress * 100) + "%"; },
  });

  // split + reveal section titles
  $$("[data-split]").forEach((title) => {
    const chars = splitTitle(title);
    gsap.fromTo(chars, { yPercent: 105 }, {
      yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.02,
      scrollTrigger: { trigger: title, start: "top 85%" },
    });
  });

  // generic reveal
  $$("[data-reveal]").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // reveal-fade items (non-hero)
  $$(".cta .reveal-fade").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // CTA title words
  gsap.fromTo(".cta__title .w", { yPercent: 110 }, {
    yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.08,
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
  });

  // intro words brighten on scroll
  const introWords = $$(".intro__text .reveal-word");
  if (introWords.length) {
    gsap.to(introWords, {
      opacity: 1, stagger: 0.04, ease: "none",
      scrollTrigger: { trigger: ".intro", start: "top 75%", end: "bottom 70%", scrub: 0.5 },
    });
  }

  initWorkReel();

  // horizontal process scroll (desktop only): title stays pinned, cards translate
  const pin = $("#processPin");
  const viewport = $(".process__viewport");
  const steps = $("#processSteps");
  const processBar = $("#processBar");
  if (pin && viewport && steps && window.matchMedia("(min-width: 721px)").matches) {
    const getScrollX = () => Math.max(0, steps.scrollWidth - viewport.clientWidth);
    gsap.to(steps, {
      x: () => -getScrollX(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => "+=" + getScrollX(),
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => { if (processBar) processBar.style.width = (self.progress * 100) + "%"; },
      },
    });
  }

  // marquee subtle drift on scroll
  const marquee = $("#marquee");
  if (marquee) {
    gsap.to(marquee, {
      xPercent: -50, ease: "none",
      scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 0.8 },
    });
  }

  // footer wordmark parallax
  gsap.to(".footer__wordmark", {
    yPercent: -12, ease: "none",
    scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
  });

  ScrollTrigger.refresh();
}

/* =========================================================
   mobile menu
   ========================================================= */
function initMobileMenu() {
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  if (!burger || !menu) return;
  const toggle = (open) => {
    burger.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("is-open")));
  $$("[data-mlink]", menu).forEach((a) => a.addEventListener("click", () => toggle(false)));
}

/* =========================================================
   CTA contact actions
   ========================================================= */
function initContact() {
  const demo = $("#ctaDemo");
  const consult = $("#ctaConsult");
  if (demo) {
    demo.href = `https://wa.me/601112814900?text=${encodeURIComponent(t("cta.waDemo"))}`;
  }
  if (consult) {
    consult.href = `https://wa.me/601112814900?text=${encodeURIComponent(t("cta.waConsult"))}`;
  }
}

/* =========================================================
   smooth anchor scrolling
   ========================================================= */
function initAnchors() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  });
}

/* =========================================================
   theme (dark / light)
   ========================================================= */
const THEME_KEY = "kormot-theme";

function getTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch (e) {}
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) {}

  const tc = $("#themeColor");
  if (tc) tc.setAttribute("content", next === "light" ? "#f5f4ef" : "#08080a");

  if (heroInstance && heroInstance.setTheme) heroInstance.setTheme(next);

  const labelKey = next === "light" ? "ui.themeToDark" : "ui.themeToLight";
  const labelText = t(labelKey, getLang());
  $$("#themeToggle, #themeToggleM").forEach((b) => b.setAttribute("aria-label", labelText));
}

function initThemeAndLang() {
  // theme is already set on <html> by the inline head script; sync the hero + controls
  applyTheme(getTheme());

  $$("#themeToggle, #themeToggleM").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  });

  $$("#langToggle, #langToggleM").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = getLang() === "bn" ? "en" : "bn";
      setLang(next);
      location.reload();
    });
  });
}

/* =========================================================
   selected work — auto slides inside the phone
   ========================================================= */
const workSlides = { setActive() {} };

function initWorkSlides() {
  const glasses = $$("[data-work-slides]");
  if (!glasses.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const interval = 3800;
  const controllers = [];

  glasses.forEach((glass) => {
    const lights = $$(".case__slide--light", glass);
    const darks = $$(".case__slide--dark", glass);
    const n = Math.min(lights.length, darks.length);
    if (n < 2) {
      controllers.push({ play() {}, pause() {} });
      return;
    }
    let i = 0;
    let timer = 0;

    const show = (idx) => {
      i = (idx + n) % n;
      lights.forEach((el, k) => el.classList.toggle("is-on", k === i));
      darks.forEach((el, k) => el.classList.toggle("is-on", k === i));
    };

    const pause = () => {
      window.clearTimeout(timer);
      window.clearInterval(timer);
      timer = 0;
    };
    const play = () => {
      if (reduce || timer) return;
      timer = window.setTimeout(() => {
        show(i + 1);
        timer = window.setInterval(() => show(i + 1), interval);
      }, interval);
    };

    controllers.push({ play, pause });
  });

  let visible = false;
  workSlides.setActive = (idx) => {
    controllers.forEach((c, i) => (visible && i === idx ? c.play() : c.pause()));
  };
  const host = document.querySelector(".work__phone") || glasses[0];
  if ("IntersectionObserver" in window && host) {
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      const on = glasses.findIndex((g) => g.classList.contains("is-on"));
      workSlides.setActive(on < 0 ? 0 : on);
    }, { threshold: 0.2 });
    io.observe(host);
  } else {
    visible = true;
    workSlides.setActive(0);
  }
}

function initWorkReel() {
  const pin = $("#workPin");
  const glasses = $$("[data-work-slides]");
  const panels = $$("[data-work-panel]");
  const sectors = $$(".work__sectors .case__sector");
  const ticks = $$("#workTicks li");
  const tickBtns = $$("[data-work-tick]");
  const bar = $("#workBar");
  const phone = $(".work__phone");
  const n = panels.length;
  if (!pin || n < 2) return;

  const products = glasses.map((g) => g.dataset.product);
  let active = -1;
  const counted = new Set();

  const setActive = (idx) => {
    idx = Math.max(0, Math.min(n - 1, idx));
    if (idx === active) return;
    active = idx;
    glasses.forEach((el, i) => el.classList.toggle("is-on", i === active));
    panels.forEach((el, i) => el.classList.toggle("is-on", i === active));
    sectors.forEach((el, i) => el.classList.toggle("is-on", i === active));
    ticks.forEach((el, i) => el.classList.toggle("is-on", i === active));
    if (phone && products[active]) phone.dataset.product = products[active];
    workSlides.setActive(active);
    if (!counted.has(active)) {
      counted.add(active);
      $$(".case__num", panels[active]).forEach(animateCount);
    }
  };

  setActive(0);

  const desktop = window.matchMedia("(min-width: 861px)").matches;
  const ScrollTrigger = window.ScrollTrigger;
  if (!desktop || !ScrollTrigger || reduced) {
    tickBtns.forEach((btn) => {
      btn.addEventListener("click", () => setActive(+btn.dataset.workTick));
    });
    if (bar) bar.style.width = "100%";
    return;
  }

  const st = ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => "+=" + Math.round(window.innerHeight * n * 0.9),
    pin: true,
    pinSpacing: true,
    scrub: 0.55,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (bar) bar.style.width = (self.progress * 100) + "%";
      setActive(Math.min(n - 1, Math.floor(self.progress * 0.999 * n)));
    },
  });

  tickBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.dataset.workTick;
      const target = st.start + ((idx + 0.35) / n) * (st.end - st.start);
      window.scrollTo({ top: target, behavior: "smooth" });
    });
  });
}

/* =========================================================
   boot
   ========================================================= */
async function boot() {
  // translate the DOM before GSAP splits titles / intro words
  applyI18n(getLang());
  $("#year").textContent = new Date().getFullYear();
  initThemeAndLang();

  // start 3D hero immediately (independent of GSAP)
  try {
    heroInstance = initHero($("#heroCanvas"));
    if (heroInstance && heroInstance.setTheme) heroInstance.setTheme(getTheme());
  } catch (err) { console.warn("hero init failed", err); }

  initCursor();
  initMobileMenu();
  initContact();
  initAnchors();
  initWorkSlides();

  await waitForGSAP();

  if (window.gsap) {
    // own the masked-text transforms in JS (avoids CSS % being baked to px)
    window.gsap.set(".hero__title .w", { yPercent: 110 });
    initMagnetic();
    await runPreloader();
    heroIntro();
    initScrollAnimations();
  } else {
    // graceful fallback: reveal everything
    document.querySelectorAll(".reveal-fade, .reveal-line, [data-reveal]").forEach((el) => {
      el.style.opacity = 1; el.style.transform = "none";
    });
    document.querySelectorAll(".hero__title .w, .cta__title .w").forEach((el) => (el.style.transform = "none"));
    $("#preloader").style.display = "none";
  }

  // recalc triggers once fonts settle
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => window.ScrollTrigger && window.ScrollTrigger.refresh());
  }
  window.addEventListener("load", () => window.ScrollTrigger && window.ScrollTrigger.refresh());
}

boot();
