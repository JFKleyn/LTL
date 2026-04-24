const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Sending...";

  const data = {
    firstname: document.getElementById("firstname").value.trim(),
    lastname: document.getElementById("lastname").value.trim(),
    email: document.getElementById("email").value.trim(),
    number: document.getElementById("number").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      status.textContent = result.error || "Something went wrong.";
      return;
    }

    status.textContent = "Message sent successfully!";
    form.reset();
  } catch (error) {
    status.textContent = "Something went wrong. Please try again.";
  }
});
