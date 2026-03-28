document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enrol-form");
  const formContainer = document.getElementById("formenrol-container");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn2");

  if (!form || !formContainer) return;

  const ENDPOINT = "/api/enrol";

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? "crimson" : "#1E5772";
  }

  function showSuccessCard() {
    formContainer.innerHTML = `
      <div class="success-container">
        <img src="../images/IMG_0222.webp" alt="LTL Private Tutoring logo">
        <h1>Thank you for your enrolment enquiry</h1>
        <p>We have received your submission and will be in contact with you as soon as possible with the relevant documentation and next steps.</p>
        <button type="button" id="back-btn">Back</button>
      </div>
    `;

    const backBtn = document.getElementById("back-btn");

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const childFullname = form.querySelector('[name="childFullname"]')?.value.trim() || "";
    const grade = form.querySelector('[name="grade"]')?.value.trim() || "";
    const school = form.querySelector('[name="school"]')?.value.trim() || "";
    const birthday = document.getElementById("birthday")?.value || "";
    const allergies = form.querySelector('[name="allergies"]')?.value.trim() || "";

    const parent1fullname = form.querySelector('[name="parent1fullname"]')?.value.trim() || "";
    const parent1email = form.querySelector('[name="parent1email"]')?.value.trim() || "";
    const parent1number = form.querySelector('[name="parent1number"]')?.value.trim() || "";
    const parent1address = form.querySelector('[name="parent1address"]')?.value.trim() || "";

    const parent2fullname = form.querySelector('[name="parent2fullname"]')?.value.trim() || "";
    const parent2email = form.querySelector('[name="parent2email"]')?.value.trim() || "";
    const parent2number = form.querySelector('[name="parent2number"]')?.value.trim() || "";
    const parent2address = form.querySelector('[name="parent2address"]')?.value.trim() || "";

    const days = [...form.querySelectorAll('input[name="days"]:checked')].map((el) => el.value);
    const services = [...form.querySelectorAll('input[name="services"]:checked')].map((el) => el.value);
    const tutoringSubjects = [...form.querySelectorAll('input[name="tutoring_subjects"]:checked')].map((el) => el.value);

    const homework_timeFrom = form.querySelector('[name="homework_timeFrom"]')?.value || "";
    const homework_timeTo = form.querySelector('[name="homework_timeTo"]')?.value || "";

    const tutoring_timeFrom = form.querySelector('[name="tutoring_timeFrom"]')?.value || "";
    const tutoring_timeTo = form.querySelector('[name="tutoring_timeTo"]')?.value || "";

    const homeschool_curriculum = form.querySelector('[name="homeschool_curriculum"]')?.value.trim() || "";
    const homeschool_timeFrom = form.querySelector('[name="homeschool_timeFrom"]')?.value || "";
    const homeschool_timeTo = form.querySelector('[name="homeschool_timeTo"]')?.value || "";

    const therapy_timeFrom = form.querySelector('[name="therapy_timeFrom"]')?.value || "";
    const therapy_timeTo = form.querySelector('[name="therapy_timeTo"]')?.value || "";

    const areasDifficulty = form.querySelector('[name="areasDifficulty"]')?.value.trim() || "";
    const learningStrengths = form.querySelector('[name="learningStrengths"]')?.value.trim() || "";
    const previousSupport = form.querySelector('[name="previousSupport"]')?.value.trim() || "";

    const socialConsent = form.querySelector('input[name="socialConsent"]:checked')?.value || "";

    if (!socialConsent) {
      alert("Please select your social media consent preference.");
      return;
    }

    const data = {
      childFullname,
      grade,
      school,
      birthday,
      allergies,

      parent1: {
        fullname: parent1fullname,
        email: parent1email,
        number: parent1number,
        address: parent1address
      },

      parent2: {
        fullname: parent2fullname,
        email: parent2email,
        number: parent2number,
        address: parent2address
      },

      days,
      services,
      tutoringSubjects,

      homework: {
        timeFrom: homework_timeFrom,
        timeTo: homework_timeTo
      },

      tutoring: {
        timeFrom: tutoring_timeFrom,
        timeTo: tutoring_timeTo
      },

      homeschool: {
        curriculum: homeschool_curriculum,
        timeFrom: homeschool_timeFrom,
        timeTo: homeschool_timeTo
      },

      therapy: {
        timeFrom: therapy_timeFrom,
        timeTo: therapy_timeTo
      },

      areasDifficulty,
      learningStrengths,
      previousSupport,
      socialConsent
    };

    if (!childFullname || !parent1fullname || !parent1email) {
      setStatus("Please complete the required fields.", true);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.style.cursor = "not-allowed";
    }

    setStatus("Sending...");

    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await resp.json();

      if (!resp.ok) {
        setStatus(`Failed to send: ${result.error || "Unknown error"}`, true);
        return;
      }

      showSuccessCard();
    } catch (err) {
      setStatus(`Network error: ${err?.message || err}`, true);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
      }
    }
  });
});
