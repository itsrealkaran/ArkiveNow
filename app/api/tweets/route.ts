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

function buildCursor(row: TweetRow, sort: string) {
  if (sort === 'popular') {
    // Use like_count and tweet_id as cursor
    return Buffer.from(`${row.public_metrics?.like_count || 0}|${row.tweet_id}`).toString('base64');
  } else {
    // Use created_at and tweet_id as cursor
    return Buffer.from(`${(row.screenshot_created_at ?? row.created_at).toISOString()}|${row.tweet_id}`).toString('base64');
  }
}

// Define the type for the return value of parseCursor
interface PopularCursor {
  likeCount: number;
  tweetId: string;
}
interface DateCursor {
  createdAt: string;
  tweetId: string;
}

function parseCursor(cursor: string, sort: string): PopularCursor | DateCursor | null {
  if (!cursor) return null;
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
  if (sort === 'popular') {
    const [likeCount, tweetId] = decoded.split('|');
    return { likeCount: parseInt(likeCount, 10), tweetId };
  } else {
    const [createdAt, tweetId] = decoded.split('|');
    return { createdAt, tweetId };
  }
}

function isPopularCursor(cursor: PopularCursor | DateCursor): cursor is PopularCursor {
  return (cursor as PopularCursor).likeCount !== undefined;
}
function isDateCursor(cursor: PopularCursor | DateCursor): cursor is DateCursor {
  return (cursor as DateCursor).createdAt !== undefined;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort') || 'latest';
  const limit = Math.min(PAGE_LIMIT, parseInt(searchParams.get('limit') || '20', 10));
  const cursor = searchParams.get('cursor');

  let orderBy = 't.screenshot_created_at DESC, t.tweet_id DESC';
  const where = "t.screenshot_arweave_id IS NOT NULL";
  let cursorClause = '';
  const params: (string | number)[] = [];

  if (sort === 'oldest') {
    orderBy = 't.screenshot_created_at ASC, t.tweet_id ASC';
  } else if (sort === 'popular') {
    orderBy = "(t.public_metrics->>'like_count')::int DESC, t.tweet_id DESC";
  }

  // Cursor-based pagination
  if (cursor) {
    const c = parseCursor(cursor, sort);
    if (c) {
      if (sort === 'popular' && isPopularCursor(c)) {
        cursorClause = `AND ((t.public_metrics->>'like_count')::int < $1 OR ((t.public_metrics->>'like_count')::int = $1 AND t.tweet_id < $2))`;
        params.push(c.likeCount ?? 0, c.tweetId ?? '');
      } else if (sort === 'oldest' && isDateCursor(c)) {
        cursorClause = `AND (t.screenshot_created_at > $1 OR (t.screenshot_created_at = $1 AND t.tweet_id > $2))`;
        params.push(c.createdAt ?? '', c.tweetId ?? '');
      } else if (isDateCursor(c)) {
        cursorClause = `AND (t.screenshot_created_at < $1 OR (t.screenshot_created_at = $1 AND t.tweet_id < $2))`;
        params.push(c.createdAt ?? '', c.tweetId ?? '');
      }
    }
  }

  const sql = `
    SELECT t.tweet_id, t.screenshot_arweave_id, t.screenshot_created_at, t.created_at, t.text, t.public_metrics, u.username
    FROM tweets t
    JOIN users u ON t.username = u.username
    WHERE ${where} ${cursorClause}
    ORDER BY ${orderBy}
    LIMIT $${params.length + 1}
  `;
  params.push(limit + 1); // Fetch one extra for nextCursor

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
    nextCursor = buildCursor(rows[limit], sort);
  }

  return NextResponse.json({ data, nextCursor });
} 