function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatList(items = []) {
  if (!items || !items.length) return "None selected";
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function formatValue(value = "") {
  return value ? escapeHtml(value) : "Not provided";
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    const {
      childFullname,
      grade,
      school,
      birthday,
      allergies,
      parent1,
      parent2,
      days,
      services,
      tutoringSubjects,
      homework,
      tutoring,
      homeschool,
      therapy,
      socialConsent
    } = data;

    if (!childFullname || !parent1?.fullname || !parent1?.email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const emailHtml = `
      <h2>New Enrolment Submission</h2>

      <h3>Learner Details</h3>
      <p><strong>Full Name:</strong> ${formatValue(childFullname)}</p>
      <p><strong>Grade:</strong> ${formatValue(grade)}</p>
      <p><strong>School:</strong> ${formatValue(school)}</p>
      <p><strong>Birthday:</strong> ${formatValue(birthday)}</p>
      <p><strong>Allergies:</strong> ${formatValue(allergies)}</p>

      <h3>Parent / Guardian 1</h3>
      <p><strong>Full Name:</strong> ${formatValue(parent1?.fullname)}</p>
      <p><strong>Email:</strong> ${formatValue(parent1?.email)}</p>
      <p><strong>Phone Number:</strong> ${formatValue(parent1?.number)}</p>
      <p><strong>Address:</strong> ${formatValue(parent1?.address)}</p>

      <h3>Parent / Guardian 2</h3>
      <p><strong>Full Name:</strong> ${formatValue(parent2?.fullname)}</p>
      <p><strong>Email:</strong> ${formatValue(parent2?.email)}</p>
      <p><strong>Phone Number:</strong> ${formatValue(parent2?.number)}</p>
      <p><strong>Address:</strong> ${formatValue(parent2?.address)}</p>

      <h3>Selected Days</h3>
      <ul>${formatList(days)}</ul>

      <h3>Selected Services</h3>
      <ul>${formatList(services)}</ul>

      <h3>Tutoring Subjects</h3>
      <ul>${formatList(tutoringSubjects)}</ul>

      <h3>Homework Support</h3>
      <p><strong>From:</strong> ${formatValue(homework?.timeFrom)}</p>
      <p><strong>To:</strong> ${formatValue(homework?.timeTo)}</p>

      <h3>Tutoring</h3>
      <p><strong>From:</strong> ${formatValue(tutoring?.timeFrom)}</p>
      <p><strong>To:</strong> ${formatValue(tutoring?.timeTo)}</p>

      <h3>Homeschool Assistance</h3>
      <p><strong>Curriculum:</strong> ${formatValue(homeschool?.curriculum)}</p>
      <p><strong>From:</strong> ${formatValue(homeschool?.timeFrom)}</p>
      <p><strong>To:</strong> ${formatValue(homeschool?.timeTo)}</p>

      <h3>Therapy Support</h3>
      <p><strong>From:</strong> ${formatValue(therapy?.timeFrom)}</p>
      <p><strong>To:</strong> ${formatValue(therapy?.timeTo)}</p>

      <h3>Social Media Consent</h3>
      <p>${formatValue(socialConsent)}</p>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `LTL Private Tutoring <${env.FROM_EMAIL}>`,
        to: [env.TO_EMAIL],
        reply_to: parent1.email,
        subject: `New Enrolment Submission - ${childFullname}`,
        html: emailHtml
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(
        JSON.stringify({
          error: resendData.message || "Failed to send email"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || "Server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}