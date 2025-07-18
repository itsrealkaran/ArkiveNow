import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const username = params.username;
  const sql = `
    SELECT author_id, name, username, profile_image_url, verified, created_at
    FROM users
    WHERE username = $1
    LIMIT 1
  `;
  const result = await query(sql, [username]);
  const row = result.rows[0];

  if (!row) {
    return NextResponse.json({});
  }

  return NextResponse.json({
    userId: row.author_id,
    name: row.name,
    username: row.username,
    profileImageUrl: row.profile_image_url,
    verified: row.verified,
    createdAt: row.created_at,
  });
} 