function buildMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  // Double the items for seamless infinite loop
  const allItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  allItems.forEach(item => {
    const span = document.createElement('span');
    span.className = 'marquee-item';
    span.innerHTML = `<i class="fas fa-star"></i> ${item}`;
    track.appendChild(span);
  });
}

buildMarquee();
