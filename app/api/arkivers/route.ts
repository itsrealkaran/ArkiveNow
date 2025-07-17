import { NextRequest, NextResponse } from 'next/server';

// GET /api/arkivers?cursor=...
export async function GET(req: NextRequest) {
  // TODO: Parse query param: cursor
  // TODO: Fetch arkivers from DB using pagination
  // TODO: Return { data: [...], nextCursor }
  return NextResponse.json({ data: [], nextCursor: null });
} 