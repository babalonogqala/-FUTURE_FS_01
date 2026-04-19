function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Observe all fade-up elements (including dynamically rendered ones)
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// Re-run after render.js has built dynamic elements
function initAnimations() {
  initScrollReveal();
}
