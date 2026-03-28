import { Resend } from "resend";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { firstname, lastname, email, message } = await request.json();

    if (!firstname || !lastname || !email || !message) {
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
      from: "LTL Private Tutoring <noreply@ltlprivatetutoring.co.za>",
      to: ["johan@venturetechnologies.co"],
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>First name:</strong> ${firstname}</p>
        <p><strong>Last name:</strong> ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
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