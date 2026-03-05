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

  const enrolBtn3 = document.getElementById("enrolBtn3");
  if (enrolBtn3) {
    enrolBtn3.addEventListener("click", () => {
      window.location.href = "enrol/index.html";
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



    //  --------------------------------------------------------------------------------------------------------------------------
// Time selection dropdown


const START = 13 * 60 + 30; // 13:30
const END   = 17 * 60;      // 17:00
const STEP  = 15;

function pad(n){ return String(n).padStart(2, "0"); }
function formatTime(mins){
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${pad(h)}:${pad(m)}`;
}
function toMinutes(h,m){ return h*60+m; }

function fillFrom(select){
  select.innerHTML = `<option value="" disabled selected>Select</option>`;
  for(let t=START; t<=END; t+=STEP){
    const o = document.createElement("option");
    o.value = formatTime(t);
    o.textContent = formatTime(t);
    select.appendChild(o);
  }
}

function fillTo(fromSelect, toSelect, hintEl){
  toSelect.innerHTML = `<option value="" disabled selected>Select</option>`;
  hintEl.textContent = "";

  const fromVal = fromSelect.value;
  if(!fromVal) return;

  const [hh, mm] = fromVal.split(":").map(Number);
  const fromMins = toMinutes(hh, mm);

  const allowed = [fromMins + 30, fromMins + 60].filter(t => t <= END);

  if(!allowed.length){
    hintEl.textContent = "No valid end times (must be +30 or +60 and ≤ 17:00).";
    return;
  }

  allowed.forEach(t=>{
    const o = document.createElement("option");
    o.value = formatTime(t);
    o.textContent = formatTime(t);
    toSelect.appendChild(o);
  });
}

function setEnabled(el, on){
  el.disabled = !on;
  if(!on) el.value = "";
}

document.querySelectorAll(".service").forEach(service => {
  const toggle = service.querySelector(".service-toggle");
  const fromSel = service.querySelector(".time-from");
  const toSel   = service.querySelector(".time-to-select");
  const hintEl  = service.querySelector(".time-hint");

  // Option 2 extra fields
  const subjectCbs = service.querySelectorAll(".subject-cb");
  const curriculum = service.querySelector(".curriculum");

  fillFrom(fromSel);
  toSel.innerHTML = `<option value="" disabled selected>Select</option>`;

  function updateState(){
    const on = toggle.checked;

    // time required only when selected
    fromSel.required = on;
    toSel.required = on;

    setEnabled(fromSel, on);
    setEnabled(toSel, on);
    hintEl.textContent = "";

    // Option 2 subjects enabled only when selected
    subjectCbs.forEach(cb => {
      cb.disabled = !on;
      if(!on) cb.checked = false;
    });

    // Option 3 curriculum enabled only when selected (keeps submission clean)
    if(curriculum){
      curriculum.disabled = !on;
      if(!on) curriculum.value = "";
    }
  }

  fromSel.addEventListener("change", () => fillTo(fromSel, toSel, hintEl));
  toggle.addEventListener("change", updateState);

  updateState();
});

// --------------------------------------------------------------------------------------------------------------------------
// Form validation rules

const enrolForm = document.querySelector("#enrol-form");

if (enrolForm) {

  enrolForm.addEventListener("submit", function(e){

    // At least one day must be selected
    const daysSelected = document.querySelectorAll('input[name="days"]:checked');

    if(daysSelected.length === 0){
      alert("Please select at least one day of the week.");
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    // At least one service must be selected
    const servicesSelected = document.querySelectorAll('.service-toggle:checked');

    if(servicesSelected.length === 0){
      alert("Please select at least one learning option.");
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    let valid = true;

    servicesSelected.forEach(serviceToggle => {

      const service = serviceToggle.closest(".service");

      const from = service.querySelector(".time-from");
      const to   = service.querySelector(".time-to-select");

      // Ensure times selected
      if(!from.value || !to.value){
        alert("Please select a valid time range for each selected service.");
        valid = false;
        return;
      }

      // Tutoring requires at least one subject
      if(service.dataset.service === "tutoring"){

        const subjects = service.querySelectorAll(".subject-cb:checked");

        if(subjects.length === 0){
          alert("Please select at least one tutoring subject.");
          valid = false;
          return;
        }

      }

      // Homeschool requires curriculum
      if(service.dataset.service === "homeschool"){

        const curriculum = service.querySelector(".curriculum");

        if(!curriculum.value.trim()){
          alert("Please enter the homeschool curriculum.");
          valid = false;
          return;
        }

      }

    });

    if(!valid){
      e.preventDefault();
      e.stopImmediatePropagation();
    }

  });

}
