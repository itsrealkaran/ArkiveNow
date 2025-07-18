import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) {
    return NextResponse.json({ exists: false });
  }

  // Extract arweave_id from the URL
  const match = url.match(/arweave\.net\/(\w+)/);
  const arweaveId = match ? match[1] : null;
  if (!arweaveId) {
    return NextResponse.json({ exists: false });
  }

  // Fetch the tweet and author info
  const sql = `
    SELECT t.tweet_id, t.screenshot_arweave_id, t.screenshot_created_at, t.author_id, u.username, u.name, u.profile_image_url
    FROM tweets t
    JOIN users u ON t.author_id = u.author_id
    WHERE t.screenshot_arweave_id = $1
    LIMIT 1
  `;
  const result = await query(sql, [arweaveId]);
  const row = result.rows[0];

  if (!row) {
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({
    exists: true,
    tweetId: row.tweet_id,
    transactionId: row.screenshot_arweave_id,
    imageUrl: `https://arweave.net/${row.screenshot_arweave_id}`,
    archivedAt: row.screenshot_created_at,
    username: row.username,
  });
} 