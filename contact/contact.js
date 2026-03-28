document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn1");
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("close-popup");

  if (!form) return;

  const ENDPOINT = "/api/contact";

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

      setStatus("Message sent successfully!");
      form.reset();
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
