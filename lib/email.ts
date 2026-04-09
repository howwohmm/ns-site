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
  const result = await resend.emails.send({
    from: "noise&signal <hi@ohm.quest>",
    to: email,
    subject: "welcome to noise&signal by ohm.",

    html: `
      <div style="background:#0d0d0d;padding:40px 24px;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
        <table width="480" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
          <tr><td style="padding:36px;">
            <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#0d0d0d;margin:0 0 20px;">noise&amp;signal,</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#0d0d0d;margin:0 0 14px;">${name}, you're approved &#8211; welcome to the first group.</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#0d0d0d;margin:0 0 14px;">you'll be added to more groups over time. that's where the good stuff lives: claude api keys, supabase pro subscriptions, and more.</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#0d0d0d;margin:0 0 14px;">in-person sessions run across the peenya campus at RUAS. ohm leads them. you'll be the first to know when something's scheduled.</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#0d0d0d;margin:0 0 28px;">p.s. it's early and scrappy. we'll make it proper once we know this experiment has legs.</p>
            <hr style="border:none;border-top:1px solid #dddddd;margin:0 0 24px;" />
            <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td>
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td bgcolor="#0d0d0d" style="border-radius:4px;">
                    <a href="${whatsappLink}" target="_blank" style="display:inline-block;padding:12px 22px;font-size:13px;font-weight:700;font-family:Arial,sans-serif;color:#ffffff;text-decoration:none;"><font color="#ffffff">join the group &rarr;</font></a>
                  </td>
                </tr></table>
              </td>
              <td align="right" style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0d0d0d;">ohm.</td>
            </tr></table>
          </td></tr>
        </table>
        </td></tr></table>
      </div>
    `,
  });
  if (result.error) {
    throw new Error(`Resend error: ${JSON.stringify(result.error)}`);
  }
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
    from: "noise&signal <hi@ohm.quest>",
    to: email,
    subject,
    html: `
      <div style="background:#0d0d0d;padding:40px 24px;font-family:system-ui,sans-serif;">
        <div style="background:#ffffff;max-width:480px;margin:0 auto;padding:36px 36px 32px;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#0d0d0d;margin:0 0 16px;">noise&amp;signal,</p>
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
