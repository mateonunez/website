import { NextResponse } from 'next/server';
import { getProfile } from 'lib/github';
import { normalizeGithubProfile } from 'lib/utils/normalizers/normalizeGithub';

export async function GET() {
  const profile = await getProfile().catch(err => {
    return NextResponse.json(
      { message: 'Something went wrong with GitHub.', extra: err },
      { status: 500 }
    );
  });
  if (!profile) {
    return NextResponse.json({ error: 'Github not available' }, { status: 500 });
  }

  const profileNormalized = normalizeGithubProfile(profile);

  return NextResponse.json({ profile: profileNormalized });
}
