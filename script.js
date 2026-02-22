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

// ------------------------------------------------------------------------------------------------------------------

// Dropdown

const btn = document.getElementById("btn-bar");
const box = document.getElementById("box");

// Toggle menu
btn.addEventListener("click", (e) => {
  e.stopPropagation(); // Important
  box.classList.toggle("show");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!box.contains(e.target) && !btn.contains(e.target)) {
    box.classList.remove("show");
  }
});

// --------------------------------------------------------------------------------------------------------------------------

   window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-container");
    const lines = hero.querySelectorAll(".hero-line");

    // If your scroll-reveal CSS is hiding the hero container, force it visible:
    hero.style.opacity = "1";
    hero.style.transform = "none";
    hero.style.filter = "none";

    lines.forEach((el, i) => {
      // Start state (force)
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";

      // Animate in (staggered)
      el.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)"}
        ],
        {
          duration: 700,
          delay: 150 + i * 150,
          easing: "ease",
          fill: "forwards"
        }
      );
    });
  });

// --------------------------------------------------------------------------------------------------------------------------
// animations


  const reveals = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // animate once (remove if you want repeat)
      }
    });
  }, { threshold: 0.5 });

  reveals.forEach((el) => io.observe(el));


// --------------------------------------------------------------------------------------------------------------------------
// Image animation

  const targets = document.querySelectorAll(".image-wrapper");

  if (targets.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.8 }
    );

    targets.forEach(target => observer.observe(target));
  }


  // --------------------------------------------------------------------------------------------------------------------------
// Button Navigation
  

document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = "contact/index.html";
    });
  }

  const enrolBtn = document.getElementById("enrol-btn");
  if (enrolBtn) {
    enrolBtn.addEventListener("click", () => {
      window.location.href = "enrol/index.html";
    });
  }
  const contactBtn2 = document.getElementById("contact-btn2");
  if (contactBtn2) {
    contactBtn2.addEventListener("click", () => {
      window.location.href = "contact/index.html";
    });
  }

  const enrolBtn2 = document.getElementById("enrol-btn2");
  if (enrolBtn2) {
    enrolBtn2.addEventListener("click", () => {
      window.location.href = "enrol/index.html";
    });
  }

  const contactBtn3 = document.getElementById("getintouch");
  if (contactBtn3) {
    contactBtn3.addEventListener("click", () => {
      window.location.href = "../contact/index.html";
    });
  }
});


  // --------------------------------------------------------------------------------------------------------------------------
// Birthday dropdown

  const input = document.querySelector("#birthday");
  const btn1 = document.querySelector(".icon-btn");
  btn1.addEventListener("click", () => {
    if (input.showPicker) input.showPicker(); // Chrome/Edge
    else input.focus(); // fallback
  });






