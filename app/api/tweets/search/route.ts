import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { PublicMetrics } from '@/types/tweet';

const PAGE_LIMIT = 20;

interface TweetRow {
  tweet_id: string;
  screenshot_arweave_id: string | null;
  screenshot_created_at: Date | null;
  created_at: Date;
  text: string;
  public_metrics: PublicMetrics;
  username: string;
}

function buildCursor(row: TweetRow) {
  return Buffer.from(`${(row.screenshot_created_at ?? row.created_at).toISOString()}|${row.tweet_id}`).toString('base64');
}

// Define the type for the return value of parseCursor
interface DateCursor {
  createdAt: string;
  tweetId: string;
}

function parseCursor(cursor: string): DateCursor | null {
  if (!cursor) return null;
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
  const [createdAt, tweetId] = decoded.split('|');
  return { createdAt, tweetId };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const limit = Math.min(PAGE_LIMIT, parseInt(searchParams.get('limit') || '20', 10));
  const cursor = searchParams.get('cursor');

  const where = "t.screenshot_arweave_id IS NOT NULL";
  let cursorClause = '';
  const params: (string | number)[] = [];

  if (q) {
    params.push(`%${q}%`);
    params.push(`%${q}%`);
    params.push(`%${q}%`);
  }

  if (cursor) {
    const c = parseCursor(cursor);
    if (c) {
      cursorClause = `AND (t.screenshot_created_at < $${params.length + 1} OR (t.screenshot_created_at = $${params.length + 1} AND t.tweet_id < $${params.length + 2}))`;
      params.push(c.createdAt ?? '', c.tweetId ?? '');
    }
  }

  const sql = `
    SELECT t.tweet_id, t.screenshot_arweave_id, t.screenshot_created_at, t.created_at, t.text, t.public_metrics, u.username
    FROM tweets t
    LEFT JOIN users u ON t.author_id = u.author_id
    WHERE ${where} ${cursorClause}
    ORDER BY t.screenshot_created_at DESC, t.tweet_id DESC
    LIMIT $${params.length + 1}
  `;
  params.push(limit + 1);

  const result = await query(sql, params);
  const rows = result.rows;

  const data = rows.slice(0, limit).map((row: TweetRow) => ({
    imageUrl: row.screenshot_arweave_id ? `https://arweave.net/${row.screenshot_arweave_id}` : null,
    transactionId: row.screenshot_arweave_id,
    username: row.username,
    time: row.screenshot_created_at || row.created_at,
    tweetId: row.tweet_id,
    tweetContent: row.text,
    publicMetrics: row.public_metrics,
  }));

  let nextCursor = null;
  if (rows.length > limit) {
    nextCursor = buildCursor(rows[limit]);
  }

  return NextResponse.json({ data, nextCursor });
} 