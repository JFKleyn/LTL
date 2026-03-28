document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const formContainer = document.getElementById("form-container");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn1");

  if (!form || !formContainer) return;

  const ENDPOINT = "/api/contact";

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? "crimson" : "#1E5772";
  }

  function showSuccessCard() {
    formContainer.innerHTML = `
      <div class="success-container">
        <img src="../images/IMG_0222.webp" alt="LTL Private Tutoring logo">
        <h1>Thank you for contacting us</h1>
        <p>We will be in contact with you as soon as possible.</p>
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

    const firstname = form.querySelector("#firstname")?.value.trim() || "";
    const lastname = form.querySelector("#lastname")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const message = form.querySelector("#message")?.value.trim() || "";

    if (!firstname || !lastname || !email || !message) {
      setStatus("Please fill in all fields.", true);
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
          "Accept": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, message }),
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
