import { NextRequest, NextResponse } from 'next/server';

// GET /api/tweets/verifyimageurl?url=...
export async function GET(req: NextRequest) {
  // TODO: Parse query param: url
  // TODO: Check DB for image URL, return details if found
  return NextResponse.json({ exists: false });
} 