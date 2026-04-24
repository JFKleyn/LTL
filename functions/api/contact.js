import { Resend } from "resend";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { firstname, lastname, email, number, message } = await request.json();

    if (!firstname || !lastname || !email || !number || !message) {
      return new Response(
        JSON.stringify({ error: "Please fill in all fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: `LTL Private Tutoring <${env.FROM_EMAIL}>`,
      to: [env.TO_EMAIL],
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number:</strong> ${number}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
