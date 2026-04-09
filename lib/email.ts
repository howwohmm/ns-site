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
      <div style="background:#0d0d0d;padding:40px 24px;font-family:system-ui,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
        <table width="480" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background:#ffffff;padding:36px 36px 32px;">
          <tr><td style="padding:36px 36px 32px;">
            <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#0d0d0d;margin:0 0 20px;">noise&amp;signal,</p>
            <p style="font-size:24px;font-weight:700;line-height:1.2;letter-spacing:-0.02em;color:#0d0d0d;margin:0 0 12px;">you're approved, ${name}.</p>
            <p style="font-size:24px;font-weight:700;line-height:1.2;letter-spacing:-0.02em;color:#0d0d0d;margin:0 0 12px;">you're one of the first into this community.</p>
            <p style="font-size:24px;font-weight:700;line-height:1.2;letter-spacing:-0.02em;color:#0d0d0d;margin:0 0 12px;">all updates, resources, and intel live in the GC -- claude api, supabase, and more -- ohm covers it with y'all in person.</p>
            <p style="font-size:24px;font-weight:700;line-height:1.2;letter-spacing:-0.02em;color:#0d0d0d;margin:0 0 28px;">things are scrappy for now -- but if this works, it'll get proper.</p>
            <hr style="border:none;border-top:1px solid #e0e0e0;margin:0 0 20px;" />
            <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td width="auto">
                <table cellpadding="0" cellspacing="0" border="0"><tr>
                  <td bgcolor="#0d0d0d" style="border-radius:4px;padding:12px 20px;">
                    <a href="${whatsappLink}" style="color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;font-family:system-ui,sans-serif;white-space:nowrap;">join the group &rarr;</a>
                  </td>
                </tr></table>
              </td>
              <td align="right" style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#0d0d0d;padding-left:16px;">ohm.</td>
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
