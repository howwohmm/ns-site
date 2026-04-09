import { neon } from "@neondatabase/serverless";

export function getDb() {
  return neon(process.env.DATABASE_URL!);
}

// lazy singleton
let _sql: ReturnType<typeof neon> | null = null;
export function sql(...args: Parameters<ReturnType<typeof neon>>) {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!);
  return _sql(...args);
}

export async function setupDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      roll_number TEXT,
      push_subscription TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      title TEXT,
      date TIMESTAMPTZ,
      location TEXT,
      whatsapp_link TEXT,
      is_published BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
