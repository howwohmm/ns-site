import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function sendConfirmationEmail({
  name,
  email,
  whatsappLink,
}: {
  name: string;
  email: string;
  whatsappLink: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: "noise&signal <onboarding@resend.dev>",
    to: email,
    subject: "you're in.",
    html: `
      <div style="background:#E8200A;padding:40px 24px;font-family:system-ui,sans-serif;">
        <div style="background:#f2ede4;max-width:480px;margin:0 auto;padding:36px 36px 32px;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#0d0d0d;margin:0 0 16px;">noise &amp; signal,</p>
          <p style="font-size:28px;font-weight:700;line-height:1.15;letter-spacing:-0.02em;color:#0d0d0d;margin:0 0 28px;">
            you're in, ${name}. details drop 24hrs before. we'll reach you then. an experiment by second year MnC students — your weekly dose of the AI saga.
          </p>
          <hr style="border:none;border-top:1px solid rgba(13,13,13,0.15);margin:0 0 20px;" />
          <table width="100%" style="border-collapse:collapse;"><tr>
            <td><a href="${whatsappLink}" style="background:#0d0d0d;color:#f2ede4;padding:10px 18px;text-decoration:none;font-size:13px;font-weight:600;border-radius:4px;display:inline-block;">join the group →</a></td>
            <td align="right"><span style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0d0d0d;">ohm.</span></td>
          </tr></table>
        </div>
      </div>
    `,
  });
}

export async function sendReminderEmail({
  email,
  subject,
  body,
  sessionUrl,
}: {
  email: string;
  subject: string;
  body: string;
  sessionUrl: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: "noise&signal <onboarding@resend.dev>",
    to: email,
    subject,
    html: `
      <div style="background:#E8200A;padding:40px 24px;font-family:system-ui,sans-serif;">
        <div style="background:#f2ede4;max-width:480px;margin:0 auto;padding:36px 36px 32px;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#0d0d0d;margin:0 0 16px;">noise &amp; signal,</p>
          <p style="font-size:26px;font-weight:700;line-height:1.15;letter-spacing:-0.02em;color:#0d0d0d;margin:0 0 24px;">${body}</p>
          <hr style="border:none;border-top:1px solid rgba(13,13,13,0.15);margin:0 0 20px;" />
          <table width="100%" style="border-collapse:collapse;"><tr>
            <td><a href="${sessionUrl}" style="background:#0d0d0d;color:#f2ede4;padding:10px 18px;text-decoration:none;font-size:13px;font-weight:600;border-radius:4px;display:inline-block;">see details →</a></td>
            <td align="right"><span style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0d0d0d;">ohm.</span></td>
          </tr></table>
        </div>
      </div>
    `,
  });
}
