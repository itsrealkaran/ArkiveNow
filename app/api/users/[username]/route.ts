import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  const sql = `
    SELECT u.author_id, u.name, u.username, u.profile_image_url, u.verified, u.created_at,
      (SELECT COUNT(*) FROM tweets t WHERE t.author_id = u.author_id AND t.screenshot_arweave_id IS NOT NULL) as count
    FROM users u
    WHERE u.username = $1
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
    count: Number(row.count),
  });
} 