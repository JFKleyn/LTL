// =========================
// REVIEWS SLIDER (PX-BASED)
// - No peeking because viewport == card width
// - Card size can change via CSS vars; JS recalculates on resize
// - Dots + arrows + swipe
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const reviews = document.querySelector(".reviews");
  const track = document.getElementById("reviewTrack");
  const viewport = reviews ? reviews.querySelector(".viewport") : null;
  const dotsWrap = document.getElementById("reviewDots");
  const prevBtn = document.querySelector(".nav.prev");
  const nextBtn = document.querySelector(".nav.next");

  if (!reviews || !track || !viewport || !dotsWrap || !prevBtn || !nextBtn) {
    console.warn("Reviews slider: missing required elements.");
    return;
  }

  const slides = Array.from(track.querySelectorAll(".card"));
  if (!slides.length) return;

  let index = 0;
  let dots = [];

  function getGapPx() {
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    return Number.isFinite(gap) ? gap : 0;
  }

  function cardWidthPx() {
    // measure actual rendered width (respects CSS variables and media queries)
    return slides[0].getBoundingClientRect().width;
  }

  function stepPx() {
    return cardWidthPx() + getGapPx();
  }

  function maxIndex() {
    // Since viewport shows exactly 1 card width on mobile, maxIndex = slides - 1.
    // But keep this robust in case you adjust viewport later.
    const totalW =
      slides.reduce((sum, s) => sum + s.getBoundingClientRect().width, 0) +
      (slides.length - 1) * getGapPx();

    const viewW = viewport.getBoundingClientRect().width;
    const maxScroll = Math.max(0, totalW - viewW);
    const step = stepPx();

    return step > 0 ? Math.round(maxScroll / step) : 0;
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    const count = maxIndex() + 1; // one dot per position
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to review ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    dots = Array.from(dotsWrap.children);
  }

  function update() {
    const maxI = maxIndex();
    if (index < 0) index = 0;
    if (index > maxI) index = maxI;

    track.style.transform = `translateX(-${index * stepPx()}px)`;

    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === maxI;
  }

  function goTo(i) {
    index = i;
    update();
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Swipe support (mobile)
  let startX = 0;
  let touching = false;

  viewport.addEventListener("touchstart", (e) => {
    touching = true;
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener("touchend", (e) => {
    if (!touching) return;
    touching = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) goTo(index - 1);
      else goTo(index + 1);
    }
  }, { passive: true });

  // Rebuild on resize (important for responsive)
  window.addEventListener("resize", () => {
    buildDots();
    update();
  });

  // Init
  buildDots();
  update();
});
