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
      <div style="background:#080808;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
        <table width="480" cellpadding="0" cellspacing="0" border="0" style="background:#111111;border:1px solid rgba(255,255,255,0.08);">
          <tr><td style="padding:36px 36px 32px;">
            <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:rgba(255,255,255,0.5);margin:0 0 20px;font-weight:400;">noise&amp;signal,</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#ffffff;margin:0 0 14px;letter-spacing:-0.02em;">${name}, you're approved - welcome to the first group.</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#ffffff;margin:0 0 14px;letter-spacing:-0.02em;">you'll be added to more groups over time. that's where the good stuff lives: claude api keys, supabase pro subscriptions, and more.</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#ffffff;margin:0 0 14px;letter-spacing:-0.02em;">in-person sessions run across the peenya campus at RUAS. ohm leads them. you'll be the first to know when something's scheduled.</p>
            <p style="font-size:22px;font-weight:700;line-height:1.25;color:#ffffff;margin:0 0 28px;letter-spacing:-0.02em;">p.s. it's early and scrappy. we'll make it proper once we know this experiment has legs.</p>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 24px;" />
            <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td>
                <a href="${whatsappLink}" target="_blank" style="background-color:#ffffff;color:#080808;display:inline-block;padding:13px 22px;font-size:13px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;text-decoration:none;">join the group &rarr;</a>
              </td>
              <td align="right" valign="middle" style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:rgba(255,255,255,0.4);padding-left:16px;white-space:nowrap;">ohm.</td>
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
      <div style="background:#080808;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
        <div style="background:#111111;border:1px solid rgba(255,255,255,0.08);max-width:480px;margin:0 auto;padding:36px 36px 32px;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:rgba(255,255,255,0.5);margin:0 0 16px;font-weight:400;">noise&amp;signal,</p>
          <p style="font-size:26px;font-weight:700;line-height:1.15;letter-spacing:-0.02em;color:#ffffff;margin:0 0 24px;">${body}</p>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 20px;" />
          <table width="100%" style="border-collapse:collapse;"><tr>
            <td><a href="${sessionUrl}" style="background:#ffffff;color:#080808;padding:10px 18px;text-decoration:none;font-size:13px;font-weight:700;display:inline-block;">see details &rarr;</a></td>
            <td align="right"><span style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:rgba(255,255,255,0.4);">ohm.</span></td>
          </tr></table>
        </div>
      </div>
    `,
  });
}
