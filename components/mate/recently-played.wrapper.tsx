import { getRecentlyPlayed } from '@/lib/spotify';
import RecentlyPlayed from './recently-played';

export async function RecentlyPlayedWrapper() {
  const recentlyPlayed = await getRecentlyPlayed();
  return <RecentlyPlayed items={recentlyPlayed?.items} />;
}
