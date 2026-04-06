import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { sendReminderEmail } from "@/lib/email";
import webpush from "web-push";

function initWebPush() {
  webpush.setVapidDetails(
    "mailto:" + process.env.VAPID_EMAIL!,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );
}

const NOTIFY_WINDOWS = [
  { hoursBeforeMs: 24 * 60 * 60 * 1000, tag: "d-1",   subject: "details are live.",            body: "the session details are now live. check the site." },
  { hoursBeforeMs: 10 * 60 * 60 * 1000, tag: "d-10h",  subject: "tonight. see you there.",       body: "tonight. the details are on the site." },
  { hoursBeforeMs: 2  * 60 * 60 * 1000, tag: "d-2h",   subject: "2 hours.",                      body: "2 hours. bring your laptop if you have one." },
  { hoursBeforeMs: 20 * 60 * 1000,       tag: "d-20m",  subject: "20 minutes.",                   body: "20 minutes. get there." },
];

// cron hits this every 30 min — guarded by CRON_SECRET
export async function GET(req: NextRequest) {
  initWebPush();
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sessions = await sql`
    SELECT * FROM sessions WHERE date IS NOT NULL ORDER BY date ASC LIMIT 1
  ` as Record<string, unknown>[];
  if (!sessions.length) return NextResponse.json({ ok: true, msg: "no session" });

  const session = sessions[0];
  const sessionDate = new Date(session.date as string).getTime();
  const now = Date.now();
  const WINDOW_MS = 35 * 60 * 1000; // 35 min window per cron tick

  const registrations = await sql`SELECT name, email, push_subscription FROM registrations` as Record<string, unknown>[];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://noiseandsignal.in";

  for (const notif of NOTIFY_WINDOWS) {
    const targetTime = sessionDate - notif.hoursBeforeMs;
    if (now >= targetTime && now < targetTime + WINDOW_MS) {
      // this window is due — send to everyone
      for (const reg of registrations) {
        // email
        try {
          await sendReminderEmail({
            email: reg.email as string,
            subject: notif.subject,
            body: notif.body,
            sessionUrl: siteUrl,
          });
        } catch {}

        // push
        if (reg.push_subscription) {
          try {
            const sub = JSON.parse(reg.push_subscription as string);
            await webpush.sendNotification(sub, JSON.stringify({
              title: "noise&signal",
              body: notif.body,
              tag: notif.tag,
              url: siteUrl,
            }));
          } catch {}
        }
      }
      return NextResponse.json({ ok: true, sent: notif.tag, count: registrations.length });
    }
  }

  return NextResponse.json({ ok: true, msg: "no window due" });
}
