import { NextResponse } from 'next/server';
import { getLastActivities } from '@/lib/github';
import { normalizeGitHubActivities } from '@/lib/utils/normalizers/normalizeGithub';

export async function GET(): Promise<NextResponse> {
  try {
    const activitiesData = await getLastActivities();

    if (!activitiesData) {
      return NextResponse.json({ error: 'GitHub activities not available' }, { status: 500 });
    }

    const normalizedActivities = normalizeGitHubActivities(activitiesData);

    return NextResponse.json(normalizedActivities);
  } catch (error) {
    console.error('Error fetching GitHub activities:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub activities' }, { status: 500 });
  }
}
