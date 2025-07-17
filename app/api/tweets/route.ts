import { NextRequest, NextResponse } from 'next/server';

// GET /api/tweets?sort=latest|oldest|popular&cursor=...
export async function GET(req: NextRequest) {
  // TODO: Parse query params: sort, cursor
  // TODO: Fetch tweets from DB using pagination and sorting
  // TODO: Return { data: [...], nextCursor }
  return NextResponse.json({ data: [], nextCursor: null });
} 