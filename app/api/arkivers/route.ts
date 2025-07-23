import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const PAGE_LIMIT = 20;

function buildCursor(row: { archived_count: number; username: string }) {
  return Buffer.from(`${row.archived_count || 0}|${row.username}`).toString('base64');
}

function parseCursor(cursor: string) {
  if (!cursor) return null;
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
  const [archivedCount, username] = decoded.split('|');
  return { archivedCount: parseInt(archivedCount, 10), username };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(PAGE_LIMIT, parseInt(searchParams.get('limit') || '20', 10));
  const cursor = searchParams.get('cursor');

  let cursorClause = '';
  const params: (number | string)[] = [];

  if (cursor) {
    const c = parseCursor(cursor);
    if (c) {
      cursorClause = `AND (archived_count < $1 OR (archived_count = $1 AND username < $2))`;
      params.push(c.archivedCount, c.username);
    }
  }

  const sql = `
    SELECT u.username, u.name, u.profile_image_url, COUNT(t.tweet_id) as archived_count
    FROM users u
    LEFT JOIN tweets t ON u.username = t.username AND t.screenshot_arweave_id IS NOT NULL
    GROUP BY u.username, u.name, u.profile_image_url
    HAVING COUNT(t.tweet_id) > 0
    ${cursorClause ? 'AND ' + cursorClause.slice(4) : ''}
    ORDER BY archived_count DESC, u.username DESC
    LIMIT $${params.length + 1}
  `;
  params.push(limit + 1);

  const result = await query(sql, params);
  const rows = result.rows;

  const data = rows.slice(0, limit).map((row: {
    username: string;
    name: string;
    profile_image_url: string;
    archived_count: string | number;
  }) => ({
    userId: row.username,
    name: row.name,
    username: row.username,
    profileImageUrl: row.profile_image_url,
    archivedCount: parseInt(row.archived_count as string, 10),
  }));

  let nextCursor = null;
  if (rows.length > limit) {
    nextCursor = buildCursor(rows[limit]);
  }

  return NextResponse.json({ data, nextCursor });
} 