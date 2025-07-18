import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const res = params !== undefined
      ? await client.query(text, params)
      : await client.query(text);
    return res;
  } finally {
    client.release();
  }
} 