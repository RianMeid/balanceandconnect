"use strict";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const navigationLinks = navigation?.querySelectorAll('a[href^="#"]') ?? [];
const yearElement = document.querySelector("[data-year]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const setMenuState = (isOpen) => {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen
    ? "Close navigation"
    : "Open navigation";
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const loadTallyEmbeds = () => {
  if (typeof Tally !== "undefined") {
    Tally.loadEmbeds();
    return;
  }

  document
    .querySelectorAll("iframe[data-tally-src]:not([src])")
    .forEach((iframe) => {
      iframe.src = iframe.dataset.tallySrc;
    });
};

const tallyScriptUrl = "https://tally.so/widgets/embed.js";

if (typeof Tally !== "undefined") {
  loadTallyEmbeds();
} else if (!document.querySelector(`script[src="${tallyScriptUrl}"]`)) {
  const tallyScript = document.createElement("script");
  tallyScript.src = tallyScriptUrl;
  tallyScript.onload = loadTallyEmbeds;
  tallyScript.onerror = loadTallyEmbeds;
  document.body.appendChild(tallyScript);
}
