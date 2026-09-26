import { connect } from "cloudflare:sockets";

function formatValue(value = "") {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
}

function formatList(items = []) {
  if (!Array.isArray(items) || !items.length) {
    return "None selected";
  }

  return items.join(", ");
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let socket;
  let writer;
  let reader;

  try {
    // ─────────────────────────────────────────────
    // Read enrolment submission
    // ─────────────────────────────────────────────
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
      socialConsent,
    } = data;

    if (!childFullname || !parent1?.fullname || !parent1?.email) {
      return json(
        {
          success: false,
          error: "Missing required fields.",
        },
        400,
      );
    }

    // Validate Parent / Guardian 1 email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(parent1.email)) {
      return json(
        {
          success: false,
          error: "Please enter a valid parent/guardian email address.",
        },
        400,
      );
    }

    // Prevent header injection
    if (/[\r\n]/.test(parent1.email)) {
      return json(
        {
          success: false,
          error: "Invalid email address.",
        },
        400,
      );
    }

    // ─────────────────────────────────────────────
    // Connect to Venture / Xneelo SMTP
    // ─────────────────────────────────────────────
    socket = connect(
      {
        hostname: env.SMTP_HOST,
        port: 465,
      },
      {
        secureTransport: "on",
      },
    );

    writer = socket.writable.getWriter();
    reader = socket.readable.getReader();

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    async function readResponse() {
      let response = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        response += decoder.decode(value, { stream: true });

        const lines = response.split("\r\n").filter(Boolean);
        const lastLine = lines[lines.length - 1];

        if (lastLine && /^\d{3} /.test(lastLine)) {
          break;
        }
      }

      return response;
    }

    async function send(command) {
      await writer.write(
        encoder.encode(command + "\r\n"),
      );

      return await readResponse();
    }

    function expect(response, codes) {
      const code = Number(response.slice(0, 3));

      if (!codes.includes(code)) {
        throw new Error(`SMTP error: ${response}`);
      }
    }

    // ─────────────────────────────────────────────
    // SMTP authentication
    // ─────────────────────────────────────────────
    let response = await readResponse();
    expect(response, [220]);

    response = await send("EHLO venturetechnologies.co");
    expect(response, [250]);

    response = await send("AUTH LOGIN");
    expect(response, [334]);

    response = await send(btoa(env.SMTP_USER));
    expect(response, [334]);

    response = await send(btoa(env.SMTP_PASSWORD));
    expect(response, [235]);

    // ─────────────────────────────────────────────
    // Addressing
    // ─────────────────────────────────────────────
    response = await send(
      `MAIL FROM:<${env.SMTP_USER}>`,
    );
    expect(response, [250]);

    // TEST recipient
    response = await send(
      "RCPT TO:<johan@venturetechnologies.co>",
    );
    expect(response, [250, 251]);

    // Venture archive / invisible BCC
    response = await send(
      "RCPT TO:<johan@venturetechnologies.co>",
    );
    expect(response, [250, 251]);

    response = await send("DATA");
    expect(response, [354]);

    // ─────────────────────────────────────────────
    // Build enrolment email
    // ─────────────────────────────────────────────
    const safeChildName = cleanHeader(childFullname);
    const safeParentName = cleanHeader(parent1.fullname);
    const safeParentEmail = cleanHeader(parent1.email);

    const subject =
      `New LTL Enrolment Submission - ${safeChildName}`;

    const emailBody = [
      `From: LTL Private Tutoring Website <${env.SMTP_USER}>`,
      `To: Johan <johan@venturetechnologies.co>`,
      `Reply-To: ${safeParentName} <${safeParentEmail}>`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "",

      "NEW LTL ENROLMENT SUBMISSION",
      "========================================",
      "",

      "LEARNER DETAILS",
      "----------------------------------------",
      `Full Name: ${formatValue(childFullname)}`,
      `Grade: ${formatValue(grade)}`,
      `School: ${formatValue(school)}`,
      `Birthday: ${formatValue(birthday)}`,
      `Allergies: ${formatValue(allergies)}`,
      "",

      "PARENT / GUARDIAN 1",
      "----------------------------------------",
      `Full Name: ${formatValue(parent1?.fullname)}`,
      `Email: ${formatValue(parent1?.email)}`,
      `Phone Number: ${formatValue(parent1?.number)}`,
      `Address: ${formatValue(parent1?.address)}`,
      "",

      "PARENT / GUARDIAN 2",
      "----------------------------------------",
      `Full Name: ${formatValue(parent2?.fullname)}`,
      `Email: ${formatValue(parent2?.email)}`,
      `Phone Number: ${formatValue(parent2?.number)}`,
      `Address: ${formatValue(parent2?.address)}`,
      "",

      "SELECTED DAYS",
      "----------------------------------------",
      formatList(days),
      "",

      "SELECTED SERVICES",
      "----------------------------------------",
      formatList(services),
      "",

      "TUTORING SUBJECTS",
      "----------------------------------------",
      formatList(tutoringSubjects),
      "",

      "HOMEWORK SUPPORT",
      "----------------------------------------",
      `From: ${formatValue(homework?.timeFrom)}`,
      `To: ${formatValue(homework?.timeTo)}`,
      "",

      "TUTORING",
      "----------------------------------------",
      `From: ${formatValue(tutoring?.timeFrom)}`,
      `To: ${formatValue(tutoring?.timeTo)}`,
      "",

      "HOMESCHOOL ASSISTANCE",
      "----------------------------------------",
      `Curriculum: ${formatValue(homeschool?.curriculum)}`,
      `From: ${formatValue(homeschool?.timeFrom)}`,
      `To: ${formatValue(homeschool?.timeTo)}`,
      "",

      "THERAPY SUPPORT",
      "----------------------------------------",
      `From: ${formatValue(therapy?.timeFrom)}`,
      `To: ${formatValue(therapy?.timeTo)}`,
      "",

      "SOCIAL MEDIA CONSENT",
      "----------------------------------------",
      formatValue(socialConsent),
      "",

      "========================================",
      "Sent via the LTL Private Tutoring website",
      "Email delivery powered by Venture Technologies",
    ].join("\r\n");

    // SMTP dot-stuffing
    const smtpSafeBody = emailBody.replace(/^\./gm, "..");

    await writer.write(
      encoder.encode(smtpSafeBody + "\r\n.\r\n"),
    );

    response = await readResponse();
    expect(response, [250]);

    await writer.write(
      encoder.encode("QUIT\r\n"),
    );

    try {
      await writer.close();
    } catch {
      // SMTP transaction already completed successfully.
    }

    return json({
      success: true,
      message: "Enrolment submitted successfully.",
    });
  } catch (error) {
    console.error("LTL ENROLMENT SMTP ERROR:", error);

    try {
      if (writer) await writer.close();
    } catch {
      // Ignore cleanup errors.
    }

    return json(
      {
        success: false,
        error:
          "We couldn't submit the enrolment. Please try again.",
      },
      500,
    );
  }
}

function cleanHeader(value) {
  return String(value)
    .replace(/[\r\n]/g, " ")
    .trim();
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
