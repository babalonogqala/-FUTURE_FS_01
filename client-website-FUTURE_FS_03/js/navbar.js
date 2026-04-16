const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// ── Scroll effect
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ── Mobile toggle
hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  const icon = hamburger.querySelector("i");
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-times", isOpen);
});

// ── Close on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = hamburger.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});
