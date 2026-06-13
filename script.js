"use strict";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const navigationLinks = navigation?.querySelectorAll('a[href^="#"]') ?? [];
const yearElement = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

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

const validationMessages = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  support_for: "Please select who you are seeking support for.",
  message: "Please add a short message.",
  consent: "Please confirm that you consent to being contacted."
};

const getField = (name) => contactForm?.elements.namedItem(name);

const setFieldError = (name, message = "") => {
  const field = getField(name);
  const error = document.getElementById(`${name}-error`);

  if (error) error.textContent = message;

  if (field instanceof RadioNodeList) {
    Array.from(field).forEach((input) => {
      input.setAttribute("aria-invalid", String(Boolean(message)));
      input.setAttribute("aria-describedby", `${name}-error`);
    });
  } else if (field instanceof HTMLElement) {
    field.setAttribute("aria-invalid", String(Boolean(message)));
    field.setAttribute("aria-describedby", `${name}-error`);
  }
};

const validateField = (name) => {
  const field = getField(name);
  let isValid = true;

  if (field instanceof RadioNodeList) {
    isValid = Boolean(field.value);
  } else if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    isValid = field.type === "checkbox" ? field.checked : field.checkValidity();
  }

  setFieldError(name, isValid ? "" : validationMessages[name]);
  return isValid;
};

["name", "email", "message", "consent"].forEach((name) => {
  const field = getField(name);
  field?.addEventListener("blur", () => validateField(name));
  field?.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") validateField(name);
  });
});

const supportFields = getField("support_for");
if (supportFields instanceof RadioNodeList) {
  Array.from(supportFields).forEach((input) => {
    input.addEventListener("change", () => validateField("support_for"));
  });
}

contactForm?.addEventListener("submit", (event) => {
  const fieldsToValidate = ["name", "email", "support_for", "message", "consent"];
  const isValid = fieldsToValidate.map(validateField).every(Boolean);
  const isPlaceholderAction = contactForm.action.includes("YOUR_FORM_ID");

  if (!isValid || isPlaceholderAction) {
    event.preventDefault();
  }

  if (!isValid) {
    const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
    firstInvalid?.focus();
    return;
  }

  if (isPlaceholderAction && formStatus) {
    formStatus.textContent =
      "The form is ready, but the Formspree ID still needs to be added. Please use the email link below for now.";
    formStatus.classList.add("is-visible", "is-error");
  }
});
