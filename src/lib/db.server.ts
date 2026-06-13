import { neon } from "@neondatabase/serverless";

let cachedSql: ReturnType<typeof neon> | null = null;
let schemaReady = false;

export function getSql() {
  if (!cachedSql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    cachedSql = neon(url);
  }
  return cachedSql;
}

export async function ensureSchema() {
  if (schemaReady) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS charger_orders (
      id SERIAL PRIMARY KEY,
      prenom TEXT NOT NULL,
      nom TEXT NOT NULL,
      telephone TEXT NOT NULL,
      wilaya TEXT NOT NULL,
      adresse TEXT NOT NULL,
      notes TEXT,
      quantity INTEGER NOT NULL DEFAULT 1,
      total_price NUMERIC(10,2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS patches_orders (
      id SERIAL PRIMARY KEY,
      prenom TEXT NOT NULL,
      nom TEXT NOT NULL,
      telephone TEXT NOT NULL,
      wilaya TEXT NOT NULL,
      adresse TEXT NOT NULL,
      notes TEXT,
      quantity INTEGER NOT NULL DEFAULT 1,
      total_price NUMERIC(10,2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  schemaReady = true;
}
