import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/github';
import { normalizeGitHubProfile } from '@/lib/utils/normalizers/normalizeGithub';

export async function GET(): Promise<NextResponse> {
  const profile = await getProfile();
  if (!profile) {
    return NextResponse.json({ error: 'Github not available' }, { status: 500 });
  }
  const profileNormalized = normalizeGitHubProfile(profile);

  return NextResponse.json(profileNormalized);
}
