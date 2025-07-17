import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/[userId]/tweets?sort=latest|oldest|popular&cursor=...
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  // TODO: Parse query params: sort, cursor
  // TODO: Fetch tweets for user from DB using pagination and sorting
  // TODO: Return { data: [...], nextCursor }
  return NextResponse.json({ data: [], nextCursor: null });
} 