import { NextRequest, NextResponse } from "next/server";
import { sql, setupDb } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, pushSubscription } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "name and email required" }, { status: 400 });
    }

    await setupDb();

    // check for duplicate
    const existing = await sql`SELECT id FROM registrations WHERE email = ${email}` as unknown[];
    if (existing.length > 0) {
      return NextResponse.json({ error: "already registered with this email" }, { status: 409 });
    }

    await sql`
      INSERT INTO registrations (name, email, push_subscription)
      VALUES (${name}, ${email}, ${pushSubscription ?? null})
    `;

    // get whatsapp link from session config
    const sessions = await sql`SELECT whatsapp_link FROM sessions ORDER BY created_at DESC LIMIT 1` as Record<string, unknown>[];
    const whatsappLink = (sessions[0]?.whatsapp_link as string) ?? process.env.WHATSAPP_GROUP_LINK ?? "#";

    try {
      await sendConfirmationEmail({ name, email, whatsappLink });
    } catch (emailErr) {
      console.error("email send failed (registration still succeeded):", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("register error:", err);
    return NextResponse.json({ error: "failed to register" }, { status: 500 });
  }
}
