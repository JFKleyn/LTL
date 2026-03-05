document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("enrol-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn2");

  if (!form) return;

  const ENDPOINT = "https://httpbin.org/post"; // test endpoint

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? "crimson" : "green";
  }

  // Enable/disable service inputs depending on checkbox
const services = document.querySelectorAll(".service");

services.forEach(service => {

  const toggle = service.querySelector(".service-toggle");
  const inputs = service.querySelectorAll("select, input.curriculum, input.subject-cb");

  function updateState() {

    const enabled = toggle.checked;

    inputs.forEach(input => {
      input.disabled = !enabled;
    });

  }

  // run once on page load
  updateState();

  // run whenever checkbox changes
  toggle.addEventListener("change", updateState);

});

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    // Learner
    const childFullname = form.querySelector('[name="childFullname"]').value.trim();
    const grade = form.querySelector('[name="grade"]').value.trim();
    const school = form.querySelector('[name="school"]').value.trim();
    const birthday = document.getElementById("birthday")?.value || "";
    const allergies = form.querySelector('[name="allergies"]').value.trim();

    // Parent 1
    const parent1fullname = form.querySelector('[name="parent1fullname"]').value.trim();
    const parent1email = form.querySelector('[name="parent1email"]').value.trim();
    const parent1number = form.querySelector('[name="parent1number"]').value.trim();
    const parent1address = form.querySelector('[name="parent1address"]').value.trim();

    // Parent 2
    const parent2fullname = form.querySelector('[name="parent2fullname"]').value.trim();
    const parent2email = form.querySelector('[name="parent2email"]').value.trim();
    const parent2number = form.querySelector('[name="parent2number"]').value.trim();
    const parent2address = form.querySelector('[name="parent2address"]').value.trim();

    // Days selected
    const days = [...form.querySelectorAll('input[name="days"]:checked')]
      .map(el => el.value);

    // Services selected
    const services = [...form.querySelectorAll('input[name="services"]:checked')]
      .map(el => el.value);

    // Tutoring subjects
    const tutoringSubjects = [...form.querySelectorAll('input[name="tutoring_subjects"]:checked')]
      .map(el => el.value);

    // Service times
    const homework_timeFrom = form.querySelector('[name="homework_timeFrom"]')?.value || "";
    const homework_timeTo = form.querySelector('[name="homework_timeTo"]')?.value || "";

    const tutoring_timeFrom = form.querySelector('[name="tutoring_timeFrom"]')?.value || "";
    const tutoring_timeTo = form.querySelector('[name="tutoring_timeTo"]')?.value || "";

    const homeschool_curriculum = form.querySelector('[name="homeschool_curriculum"]')?.value || "";
    const homeschool_timeFrom = form.querySelector('[name="homeschool_timeFrom"]')?.value || "";
    const homeschool_timeTo = form.querySelector('[name="homeschool_timeTo"]')?.value || "";

    const therapy_timeFrom = form.querySelector('[name="therapy_timeFrom"]')?.value || "";
    const therapy_timeTo = form.querySelector('[name="therapy_timeTo"]')?.value || "";

    // Social consent
    const socialConsent = form.querySelector('input[name="socialConsent"]:checked')?.value || "";

if(!socialConsent || socialConsent.value === ""){
      alert("Please select your social media consent preference.");
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }

    const data = {
      childFullname,
      grade,
      school,
      birthday,
      allergies,

      parent1: {
        parent1fullname,
        parent1email,
        parent1number,
        parent1address
      },

      parent2: {
        parent2fullname,
        parent2email,
        parent2number,
        parent2address
      },

      days,
      services,
      tutoringSubjects,

      homework_timeFrom,
      homework_timeTo,

      tutoring_timeFrom,
      tutoring_timeTo,

      homeschool_curriculum,
      homeschool_timeFrom,
      homeschool_timeTo,

      therapy_timeFrom,
      therapy_timeTo,

      socialmediaconsent: {
        socialConsent
      }

      
    };

    if (!childFullname || !parent1email) {
      setStatus("Please complete the required fields.", true);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
    }

    setStatus("Sending...");

    try {

      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        setStatus(`Failed to send: ${errText}`, true);
        return;
      }

      form.reset();

      window.location.href = "/enrol/success.html";

    } catch (err) {
      setStatus(`Network error: ${err?.message || err}`, true);
    }

    finally {

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }

    }

  }); 

});










// document.addEventListener("DOMContentLoaded", () => {

//   const form = document.getElementById("enrol-form");

//   form.addEventListener("submit", function (e) {

//     e.preventDefault();
//     e.stopImmediatePropagation();

//     const childFullname = form.querySelector('[name="childFullname"]').value;
//     const grade = form.querySelector('[name="grade"]').value;
//     const school = form.querySelector('[name="school"]').value;
//     const birthday = document.getElementById("birthday").value;
//     const allergies = form.querySelector('[name="allergies"]').value;

//     const parent1fullname = form.querySelector('[name="parent1fullname"]').value;
//     const parent1email = form.querySelector('[name="parent1email"]').value;
//     const parent1number = form.querySelector('[name="parent1number"]').value;

//     const days = [...form.querySelectorAll('input[name="days"]:checked')]
//       .map(el => el.value);

//     const services = [...form.querySelectorAll('input[name="services"]:checked')]
//       .map(el => el.value);

//     const tutoringSubjects = [...form.querySelectorAll('input[name="tutoring_subjects"]:checked')]
//       .map(el => el.value);

//     const socialConsent = form.querySelector('input[name="socialConsent"]:checked')?.value;

//     if(!socialConsent || socialConsent.value === ""){
//       alert("Please select your social media consent preference.");
//       e.preventDefault();
//       e.stopImmediatePropagation();
//       return;
//     }

//     const data = {
//       learner: {
//         childFullname,
//         grade,
//         school,
//         birthday,
//         allergies
//       },

//       parent1: {
//         parent1fullname,
//         parent1email
//       },

//       days,
//       services,
//       tutoringSubjects,
//       socialConsent
//     };

//     console.log("Enrolment Data:\n", JSON.stringify(data, null, 2));

//     console.table(data.days);
// console.table(data.services);
// console.table(data.tutoringSubjects);

//     alert("Form captured! Check the console.");

//   });

// });
