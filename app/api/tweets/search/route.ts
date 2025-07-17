import { NextRequest, NextResponse } from 'next/server';

// GET /api/tweets/search?q=...&cursor=...
export async function GET(req: NextRequest) {
  // TODO: Parse query params: q, cursor
  // TODO: Search tweets in DB using pagination
  // TODO: Return { data: [...], nextCursor }
  return NextResponse.json({ data: [], nextCursor: null });
} 