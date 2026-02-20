// STUB — frontend-only build (no Supabase SDK)
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request });
}
