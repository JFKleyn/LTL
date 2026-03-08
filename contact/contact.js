// contact/contact.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn1");

  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("close-popup");

  if (!form) return;

  // If you have a "success" route in your HTML action, we will ignore it and use JS instead.
  // Set this to your actual API endpoint (recommended):
  // Example: "/api/contact" if your function is at functions/api/contact.js
  const ENDPOINT = "https://httpbin.org/post"; // <-- change if yours is different

  function setStatus(msg, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = isError ? "crimson" : "green";
  }

  function openPopup() {
    if (popup) popup.style.display = "block";
  }

  function closePopup() {
    if (popup) popup.style.display = "none";
  }

  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", closePopup);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Read values from inputs
    const firstname = form.querySelector("#firstname")?.value.trim() || "";
    const lastname = form.querySelector("#lastname")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const message = form.querySelector("#message")?.value.trim() || "";

    // Simple client-side checks (server still validates too)
    if (!firstname || !lastname || !email || !message) {
      setStatus("Please fill in all fields.", true);
      return;
    }

    // Disable button while submitting
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

      if (!resp.ok) {
        const errText = await resp.text();
        setStatus(`Failed to send: ${errText}`, true);
        return;
      }

      // Success
      setStatus("Message sent successfully!");
      form.reset();

      // Show popup if you want
      openPopup();
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