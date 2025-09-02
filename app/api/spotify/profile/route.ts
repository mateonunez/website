import { NextResponse } from 'next/server';
import { getUserProfile } from '@/lib/spotify';
import { normalizeProfile } from '@/lib/utils/normalizers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<NextResponse> {
  try {
    const profile = await getUserProfile();
    if (!profile) {
      return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
    }

    return NextResponse.json(normalizeProfile(profile), { status: 200 });
  } catch (error) {
    console.error('Error fetching spotify profile:', error);
    return NextResponse.json({ error: 'Spotify not available' }, { status: 503 });
  }
}
