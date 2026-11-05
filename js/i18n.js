/* =========================================================
   kormot — internationalization (English / বাংলা)
   ---------------------------------------------------------
   Text is applied at boot BEFORE GSAP splits titles / words,
   so every animation runs on the already-translated strings.
   Switching language persists the choice and reloads, keeping
   the split/reveal logic dead simple and robust.
   ========================================================= */

export const LANGS = ["en", "bn"];
const STORE_KEY = "kormot-lang";

export const I18N = {
  en: {
    "doc.title": "kormot — Software, forged through relentless craft",

    "nav.products": "Products",
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.process": "Process",
    "nav.stack": "Stack",
    "nav.start": "Start a project",
    "nav.contact": "Contact",

    "hero.eyebrow1": "SaaS products",
    "hero.eyebrow2": "Custom software",
    "hero.t1": "Software,",
    "hero.t2": "forged through",
    "hero.t3": "relentless craft.",
    "hero.lede": "<strong>kormot</strong> — Bengali for <em>hard work</em>. We design and engineer SaaS products and custom software that move ambitious companies forward.",
    "hero.demo": "Book a demo",
    "hero.work": "See our work",
    "hero.stat1": "Products shipped",
    "hero.stat2": "Enterprise clients",
    "hero.stat3": "Platform uptime",
    "hero.stat4": "Engineering craft",
    "hero.scroll": "Scroll",

    "intro.text": '<span class="reveal-word">We</span> <span class="reveal-word">turn</span> <span class="reveal-word">complex</span> <span class="reveal-word">problems</span> <span class="reveal-word">into</span> <span class="reveal-word accent">elegant,</span> <span class="reveal-word accent">scalable</span> <span class="reveal-word accent">software</span> — <span class="reveal-word">from</span> <span class="reveal-word">first</span> <span class="reveal-word">principles</span> <span class="reveal-word">to</span> <span class="reveal-word">production</span> <span class="reveal-word">scale.</span>',

    "products.title": "SaaS Products",
    "products.sub": "Battle-tested platforms we build, run, and scale — used by thousands of teams every day.",
    "products.live": "Live",
    "products.d1": "Automation that orchestrates work across tools — no-code flows with enterprise governance.",
    "products.d2": "Real-time financial operations — reconciliation, forecasting, and spend intelligence in one ledger.",
    "products.d3": "Product analytics with a warehouse-native core. Ask questions in plain language, get answers in ms.",
    "products.d4": "Customer engagement that feels personal at scale — messaging, journeys, and lifecycle in one canvas.",

    "services.title": "Custom Software",
    "services.sub": "An embedded product & engineering team that ships like a startup and operates like an enterprise.",
    "services.n1": "Product Strategy & Design",
    "services.d1": "Discovery, UX research, and design systems that turn fuzzy ideas into roadmaps and pixel-perfect interfaces.",
    "services.n2": "Web & Mobile Engineering",
    "services.d2": "High-performance web apps and native-grade mobile experiences built on modern, type-safe foundations.",
    "services.n3": "Cloud & DevOps",
    "services.d3": "Infrastructure as code, CI/CD, and observability that make releases boring — in the best way possible.",
    "services.n4": "AI & Data",
    "services.d4": "From data pipelines to LLM-powered features — pragmatic AI that ships value, not just demos.",
    "services.n5": "Platform Modernization",
    "services.d5": "Re-architect legacy systems into modular, observable platforms — without halting the business.",
    "services.n6": "QA & Reliability",
    "services.d6": "Automated testing, performance budgets, and SRE practices that keep uptime where it belongs: up.",

    "work.title": "Selected Work",
    "work.sub": "Outcomes over output. A few partnerships where craft turned into measurable results.",
    "work.t1": "Scaling a payments platform to 10M users",
    "work.cd1": "Re-platformed a monolith into an event-driven core, cutting checkout latency and unlocking global expansion.",
    "work.m1a": "Faster checkout",
    "work.m1b": "Active users",
    "work.m1c": "Throughput",
    "work.t2": "Real-time fleet intelligence at continental scale",
    "work.cd2": "Built a streaming data platform and dispatcher console handling millions of telemetry events per minute.",
    "work.m2a": "Lower fuel cost",
    "work.m2b": "Events/min",
    "work.m2c": "Live latency",
    "work.t3": "A HIPAA-grade care platform, shipped in 16 weeks",
    "work.cd3": "Designed and built a compliant telehealth product end-to-end — from clinician tooling to patient apps.",
    "work.m3a": "To launch",
    "work.m3b": "CSAT",
    "work.m3c": "Compliance",

    "process.title": "How we work",
    "process.sub": "A transparent, momentum-driven process — from first conversation to continuous scale.",
    "process.t1": "Discover",
    "process.d1": "We embed with your team, map the problem space, and align on outcomes, constraints, and success metrics.",
    "process.t2": "Design",
    "process.d2": "Architecture, UX, and prototypes. We de-risk the hard parts early with working spikes — not slideware.",
    "process.t3": "Build",
    "process.d3": "Tight iterative sprints with demoable increments every week. Quality and velocity, engineered together.",
    "process.t4": "Launch",
    "process.d4": "Hardening, performance budgets, and a confident rollout with observability baked in from day one.",
    "process.t5": "Scale",
    "process.d5": "We stay on as partners — optimizing, extending, and scaling the product as your business grows.",

    "stack.title": "Technology & Expertise",
    "stack.sub": "We choose boring-where-it-matters and bleeding-edge-where-it-counts. The tools behind the craft.",
    "stack.h1": "Languages",
    "stack.h2": "Frontend",
    "stack.h3": "Backend & Data",
    "stack.h4": "Cloud & AI",

    "testi.title": "Client Success",
    "testi.sub": "The partnerships we're proudest of are the ones that keep coming back.",
    "testi.q1": "“kormot operated like an extension of our own team — but with a level of craft and velocity we couldn't hire for. They shipped what three vendors before them couldn't.”",
    "testi.r1": "VP Engineering, Northwind Pay",
    "testi.q2": "“The most impressive part wasn't the launch — it was how reliable everything stayed at scale. Uptime, performance, support: all enterprise-grade.”",
    "testi.r2": "CTO, Atlas Logistics",
    "testi.q3": "“They understood the regulatory weight of healthcare and still moved fast. We launched a compliant product in a quarter, not a year.”",
    "testi.r3": "Founder, Caregrid Health",
    "testi.trusted": "Trusted by teams at",

    "cta.eyebrow": "Let's build",
    "cta.t1": "Have something",
    "cta.t2": "worth building?",
    "cta.sub": "Book a demo of our products or a free consultation about your custom build. We reply within one business day.",
    "cta.demo": "Book a demo",
    "cta.consult": "Free consultation",
    "cta.waDemo": "Hi kormot — I'd like to book a product demo.",
    "cta.waConsult": "Hi kormot — I'd like a free consultation about a custom project.",

    "footer.tagline": "Software, forged through relentless craft. SaaS products & custom software for ambitious teams.",
    "footer.company": "Company",
    "footer.products": "Products",
    "footer.connect": "Connect",
    "footer.about": "About",
    "footer.work": "Work",
    "footer.process": "Process",
    "footer.contact": "Contact",
    "footer.rights": '© <span id="year"></span> kormot studio. All rights reserved.',
    "footer.built": "Built with relentless craft.",

    "ui.lang": "বাংলা",
    "ui.themeToDark": "Switch to dark theme",
    "ui.themeToLight": "Switch to light theme",
  },

  bn: {
    "doc.title": "kormot — নিরলস পরিশ্রমে গড়া সফটওয়্যার",

    "nav.products": "প্রোডাক্ট",
    "nav.services": "সার্ভিস",
    "nav.work": "কাজ",
    "nav.process": "প্রক্রিয়া",
    "nav.stack": "প্রযুক্তি",
    "nav.start": "প্রজেক্ট শুরু করুন",
    "nav.contact": "যোগাযোগ",

    "hero.eyebrow1": "স্যাস প্রোডাক্ট",
    "hero.eyebrow2": "কাস্টম সফটওয়্যার",
    "hero.t1": "সফটওয়্যার,",
    "hero.t2": "গড়ে ওঠে",
    "hero.t3": "নিরলস পরিশ্রমে।",
    "hero.lede": "<strong>kormot</strong> — বাংলায় <em>কঠোর পরিশ্রম</em>। আমরা উচ্চাকাঙ্ক্ষী প্রতিষ্ঠানের জন্য স্যাস প্রোডাক্ট ও কাস্টম সফটওয়্যার ডিজাইন ও তৈরি করি।",
    "hero.demo": "ডেমো বুক করুন",
    "hero.work": "আমাদের কাজ দেখুন",
    "hero.stat1": "প্রোডাক্ট ডেলিভারড",
    "hero.stat2": "এন্টারপ্রাইজ ক্লায়েন্ট",
    "hero.stat3": "প্ল্যাটফর্ম আপটাইম",
    "hero.stat4": "ইঞ্জিনিয়ারিং নিপুণতা",
    "hero.scroll": "স্ক্রোল",

    "intro.text": '<span class="reveal-word">আমরা</span> <span class="reveal-word">জটিল</span> <span class="reveal-word">সমস্যাকে</span> <span class="reveal-word">রূপ</span> <span class="reveal-word">দিই</span> <span class="reveal-word accent">মার্জিত,</span> <span class="reveal-word accent">স্কেলযোগ্য</span> <span class="reveal-word accent">সফটওয়্যারে</span> — <span class="reveal-word">মূল</span> <span class="reveal-word">ভিত্তি</span> <span class="reveal-word">থেকে</span> <span class="reveal-word">প্রোডাকশন</span> <span class="reveal-word">স্কেল</span> <span class="reveal-word">পর্যন্ত।</span>',

    "products.title": "স্যাস প্রোডাক্ট",
    "products.sub": "পরীক্ষিত প্ল্যাটফর্ম যা আমরা তৈরি করি, পরিচালনা করি ও স্কেল করি — প্রতিদিন হাজারো টিম ব্যবহার করে।",
    "products.live": "লাইভ",
    "products.d1": "টুলজুড়ে কাজ সাজিয়ে দেয় এমন অটোমেশন — এন্টারপ্রাইজ গভর্নেন্সসহ নো-কোড ফ্লো।",
    "products.d2": "রিয়েল-টাইম আর্থিক পরিচালনা — এক লেজারে রিকনসিলিয়েশন, পূর্বাভাস ও ব্যয় বিশ্লেষণ।",
    "products.d3": "ওয়্যারহাউস-নেটিভ কোরসহ প্রোডাক্ট অ্যানালিটিক্স। সহজ ভাষায় প্রশ্ন করুন, মিলিসেকেন্ডে উত্তর পান।",
    "products.d4": "বড় পরিসরেও ব্যক্তিগত অনুভূতির গ্রাহক সম্পৃক্ততা — এক ক্যানভাসে মেসেজিং, জার্নি ও লাইফসাইকেল।",

    "services.title": "কাস্টম সফটওয়্যার",
    "services.sub": "একটি সংযুক্ত প্রোডাক্ট ও ইঞ্জিনিয়ারিং টিম যা স্টার্টআপের গতিতে ডেলিভার করে, এন্টারপ্রাইজের মানে পরিচালিত হয়।",
    "services.n1": "প্রোডাক্ট স্ট্র্যাটেজি ও ডিজাইন",
    "services.d1": "ডিসকভারি, ইউএক্স গবেষণা ও ডিজাইন সিস্টেম যা অস্পষ্ট ধারণাকে রোডম্যাপ ও নিখুঁত ইন্টারফেসে রূপ দেয়।",
    "services.n2": "ওয়েব ও মোবাইল ইঞ্জিনিয়ারিং",
    "services.d2": "আধুনিক, টাইপ-সেফ ভিত্তির ওপর উচ্চ-পারফরম্যান্স ওয়েব অ্যাপ ও নেটিভ-মানের মোবাইল অভিজ্ঞতা।",
    "services.n3": "ক্লাউড ও ডেভঅপস",
    "services.d3": "ইনফ্রাস্ট্রাকচার অ্যাজ কোড, সিআই/সিডি ও অবজার্ভেবিলিটি যা রিলিজকে নিরুপদ্রব করে তোলে।",
    "services.n4": "এআই ও ডেটা",
    "services.d4": "ডেটা পাইপলাইন থেকে এলএলএম-চালিত ফিচার — বাস্তবমুখী এআই যা শুধু ডেমো নয়, মূল্য যোগ করে।",
    "services.n5": "প্ল্যাটফর্ম আধুনিকীকরণ",
    "services.d5": "ব্যবসা না থামিয়ে লিগ্যাসি সিস্টেমকে মডুলার, অবজার্ভেবল প্ল্যাটফর্মে পুনর্গঠন।",
    "services.n6": "কিউএ ও নির্ভরযোগ্যতা",
    "services.d6": "স্বয়ংক্রিয় টেস্টিং, পারফরম্যান্স বাজেট ও এসআরই চর্চা যা আপটাইম ধরে রাখে।",

    "work.title": "নির্বাচিত কাজ",
    "work.sub": "আউটপুট নয়, ফলাফলই মুখ্য। কিছু অংশীদারিত্ব যেখানে নিপুণতা পরিমাপযোগ্য ফলাফলে রূপ নিয়েছে।",
    "work.t1": "পেমেন্ট প্ল্যাটফর্মকে ১ কোটি ব্যবহারকারীতে স্কেল করা",
    "work.cd1": "একটি মনোলিথকে ইভেন্ট-ড্রিভেন কোরে রূপান্তর, চেকআউট লেটেন্সি কমিয়ে বৈশ্বিক সম্প্রসারণ সম্ভব করেছে।",
    "work.m1a": "দ্রুত চেকআউট",
    "work.m1b": "সক্রিয় ব্যবহারকারী",
    "work.m1c": "থ্রুপুট",
    "work.t2": "মহাদেশীয় পরিসরে রিয়েল-টাইম ফ্লিট ইন্টেলিজেন্স",
    "work.cd2": "প্রতি মিনিটে লক্ষাধিক টেলিমেট্রি ইভেন্ট সামলাতে একটি স্ট্রিমিং ডেটা প্ল্যাটফর্ম ও ডিসপ্যাচার কনসোল তৈরি।",
    "work.m2a": "কম জ্বালানি খরচ",
    "work.m2b": "ইভেন্ট/মিনিট",
    "work.m2c": "লাইভ লেটেন্সি",
    "work.t3": "১৬ সপ্তাহে ডেলিভারড HIPAA-মানের কেয়ার প্ল্যাটফর্ম",
    "work.cd3": "ক্লিনিশিয়ান টুল থেকে রোগী অ্যাপ পর্যন্ত — সম্পূর্ণ কমপ্লায়েন্ট টেলিহেলথ প্রোডাক্ট ডিজাইন ও তৈরি।",
    "work.m3a": "লঞ্চ পর্যন্ত",
    "work.m3b": "সিস্যাট",
    "work.m3c": "কমপ্লায়েন্স",

    "process.title": "আমরা যেভাবে কাজ করি",
    "process.sub": "একটি স্বচ্ছ, গতিময় প্রক্রিয়া — প্রথম আলাপ থেকে ধারাবাহিক স্কেল পর্যন্ত।",
    "process.t1": "ডিসকভার",
    "process.d1": "আমরা আপনার টিমের সাথে মিশে গিয়ে সমস্যার পরিসর ম্যাপ করি এবং ফলাফল, সীমাবদ্ধতা ও সাফল্যের মানদণ্ডে একমত হই।",
    "process.t2": "ডিজাইন",
    "process.d2": "আর্কিটেকচার, ইউএক্স ও প্রোটোটাইপ। কঠিন অংশগুলো আগেভাগেই কার্যকর স্পাইক দিয়ে ঝুঁকিমুক্ত করি — স্লাইড নয়।",
    "process.t3": "বিল্ড",
    "process.d3": "প্রতি সপ্তাহে ডেমোযোগ্য অগ্রগতিসহ নিবিড় ইটারেটিভ স্প্রিন্ট। মান ও গতি, একসাথে নির্মিত।",
    "process.t4": "লঞ্চ",
    "process.d4": "হার্ডেনিং, পারফরম্যান্স বাজেট ও প্রথম দিন থেকেই অবজার্ভেবিলিটিসহ আত্মবিশ্বাসী রোলআউট।",
    "process.t5": "স্কেল",
    "process.d5": "আমরা অংশীদার হিসেবে থেকে যাই — ব্যবসা বাড়ার সাথে প্রোডাক্ট অপ্টিমাইজ, সম্প্রসারণ ও স্কেল করি।",

    "stack.title": "প্রযুক্তি ও দক্ষতা",
    "stack.sub": "যেখানে দরকার সেখানে স্থিতিশীল, যেখানে গুরুত্বপূর্ণ সেখানে অত্যাধুনিক — নিপুণতার পেছনের টুল।",
    "stack.h1": "ল্যাঙ্গুয়েজ",
    "stack.h2": "ফ্রন্টএন্ড",
    "stack.h3": "ব্যাকএন্ড ও ডেটা",
    "stack.h4": "ক্লাউড ও এআই",

    "testi.title": "ক্লায়েন্ট সাফল্য",
    "testi.sub": "যে অংশীদারিত্বগুলো নিয়ে আমরা সবচেয়ে গর্বিত, সেগুলোই বারবার ফিরে আসে।",
    "testi.q1": "“kormot আমাদের নিজেদের টিমেরই একটি অংশের মতো কাজ করেছে — কিন্তু এমন নিপুণতা ও গতিতে যা আমরা নিয়োগ দিয়ে পেতাম না। আগের তিন ভেন্ডর যা পারেনি, ওরা তা ডেলিভার করেছে।”",
    "testi.r1": "ভিপি ইঞ্জিনিয়ারিং, Northwind Pay",
    "testi.q2": "“সবচেয়ে চমকপ্রদ ছিল লঞ্চ নয় — বরং স্কেলেও সবকিছু কতটা নির্ভরযোগ্য থেকেছে। আপটাইম, পারফরম্যান্স, সাপোর্ট: সবই এন্টারপ্রাইজ-মানের।”",
    "testi.r2": "সিটিও, Atlas Logistics",
    "testi.q3": "“ওরা স্বাস্থ্যসেবার নিয়ন্ত্রক জটিলতা বুঝেছে, তবুও দ্রুত এগিয়েছে। এক বছরে নয়, এক প্রান্তিকেই আমরা একটি কমপ্লায়েন্ট প্রোডাক্ট লঞ্চ করেছি।”",
    "testi.r3": "প্রতিষ্ঠাতা, Caregrid Health",
    "testi.trusted": "যেসব টিম আমাদের ওপর আস্থা রাখে",

    "cta.eyebrow": "চলুন তৈরি করি",
    "cta.t1": "এমন কিছু আছে যা",
    "cta.t2": "তৈরির যোগ্য?",
    "cta.sub": "আমাদের প্রোডাক্টের ডেমো কিংবা আপনার কাস্টম প্রজেক্ট নিয়ে বিনামূল্যে পরামর্শ বুক করুন। আমরা এক কর্মদিবসের মধ্যে উত্তর দিই।",
    "cta.demo": "ডেমো বুক করুন",
    "cta.consult": "বিনামূল্যে পরামর্শ",
    "cta.waDemo": "হ্যালো kormot — আমি একটি প্রোডাক্ট ডেমো বুক করতে চাই।",
    "cta.waConsult": "হ্যালো kormot — আমি একটি কাস্টম প্রজেক্ট নিয়ে বিনামূল্যে পরামর্শ চাই।",

    "footer.tagline": "নিরলস পরিশ্রমে গড়া সফটওয়্যার। উচ্চাকাঙ্ক্ষী টিমের জন্য স্যাস প্রোডাক্ট ও কাস্টম সফটওয়্যার।",
    "footer.company": "কোম্পানি",
    "footer.products": "প্রোডাক্ট",
    "footer.connect": "যুক্ত হোন",
    "footer.about": "পরিচিতি",
    "footer.work": "কাজ",
    "footer.process": "প্রক্রিয়া",
    "footer.contact": "যোগাযোগ",
    "footer.rights": '© <span id="year"></span> kormot studio. সর্বস্বত্ব সংরক্ষিত।',
    "footer.built": "নিরলস পরিশ্রমে নির্মিত।",

    "ui.lang": "EN",
    "ui.themeToDark": "ডার্ক থিমে যান",
    "ui.themeToLight": "লাইট থিমে যান",
  },
};

export function getLang() {
  try {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored && LANGS.includes(stored)) return stored;
  } catch (e) {}
  return "en";
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  try {
    localStorage.setItem(STORE_KEY, lang);
  } catch (e) {}
}

export function t(key, lang) {
  const l = lang || getLang();
  return (I18N[l] && I18N[l][key]) || (I18N.en && I18N.en[key]) || "";
}

/* Apply all translations to the DOM. Runs before GSAP setup. */
export function applyI18n(lang) {
  const l = LANGS.includes(lang) ? lang : "en";
  const dict = I18N[l];
  if (!dict) return;

  document.documentElement.setAttribute("lang", l);

  const title = dict["doc.title"];
  if (title) document.title = title;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && key in dict) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (key && key in dict) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key && key in dict) el.setAttribute("aria-label", dict[key]);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key && key in dict) el.setAttribute("placeholder", dict[key]);
  });
}
