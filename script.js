const loader = document.getElementById("loader");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("nav a");
const revealElements = document.querySelectorAll(".reveal");
const year = document.getElementById("year");

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 900);
});

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach(section => activeObserver.observe(section));

// Small interactive "world" effect: clicking the background creates a pixel burst.
document.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) return;

  const burst = document.createElement("span");
  burst.className = "pixel-burst";
  burst.style.left = `${event.clientX}px`;
  burst.style.top = `${event.clientY}px`;
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 650);
});
