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
    from: "ohm. <noreply@noiseandsignal.in>",
    to: email,
    subject: "you're in. details drop soon.",
    html: `
      <div style="background:#1a1a1a;color:#f0f0f0;padding:48px 32px;font-family:sans-serif;max-width:480px;margin:0 auto;">
        <div style="font-size:32px;font-weight:700;color:#E8FF47;margin-bottom:32px;">Ω</div>
        <p style="font-size:15px;font-weight:300;line-height:1.8;color:#d0d0d0;margin-bottom:24px;">
          hey ${name},<br/><br/>
          you're registered for noise&signal.<br/>
          details drop 24hrs before. watch for the ping.
        </p>
        <div style="border:1px solid #2a2a2a;padding:20px;margin-bottom:24px;">
          <p style="font-size:13px;color:#8a8a8a;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em;">meanwhile</p>
          <p style="font-size:14px;font-weight:300;line-height:1.7;color:#d0d0d0;margin-bottom:16px;">
            join the whatsapp group to stay in the loop with the community.
          </p>
          <a href="${whatsappLink}" style="background:#E8FF47;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;">
            join noise&signal →
          </a>
        </div>
        <p style="font-size:12px;color:#555;line-height:1.6;">
          — ohm. · x.com/ohmdreams<br/>
          ruas, cse
        </p>
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
    from: "ohm. <noreply@noiseandsignal.in>",
    to: email,
    subject,
    html: `
      <div style="background:#1a1a1a;color:#f0f0f0;padding:48px 32px;font-family:sans-serif;max-width:480px;margin:0 auto;">
        <div style="font-size:32px;font-weight:700;color:#E8FF47;margin-bottom:32px;">Ω</div>
        <p style="font-size:15px;font-weight:300;line-height:1.8;color:#d0d0d0;margin-bottom:24px;">
          ${body}
        </p>
        <a href="${sessionUrl}" style="background:#E8FF47;color:#1a1a1a;padding:12px 24px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;margin-bottom:32px;">
          see details →
        </a>
        <p style="font-size:12px;color:#555;">— ohm. · noise&signal</p>
      </div>
    `,
  });
}
