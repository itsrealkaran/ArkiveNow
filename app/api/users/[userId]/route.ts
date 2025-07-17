import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/[userId]
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  // TODO: Fetch user details from DB
  return NextResponse.json({});
} 