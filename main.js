"use strict";

/* Mobile */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

function closeNavigation() {
  if (!menuButton || !navigation) {
    return;
  }

  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("click", (event) => {
    const clickedMenu = menuButton.contains(event.target);
    const clickedNavigation = navigation.contains(event.target);

    if (!clickedMenu && !clickedNavigation) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeNavigation();
    }
  });
}

/* Copyright year */

document.querySelectorAll("#current-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

/* Scroll reveal */

const revealElements = document.querySelectorAll(
  ".card, .benefit, .team-card, .offline-card, .contact-form-card"
);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("revealed");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${(index % 3) * 70}ms`;
    revealObserver.observe(element);
  });
}
