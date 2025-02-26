import config from '@/lib/config';
import type { SpotifyArtist, SpotifyCurrentlyPlaying, SpotifyRecentlyPlayed, SpotifyTrack } from '@/types/spotify';

export async function currentlyListeningFetcher(): Promise<SpotifyCurrentlyPlaying> {
  const currentlyListeningResponse = await fetch(`${config.baseUrl}/api/spotify/currently-listening`, {
    next: { revalidate: 5 },
  });
  const currentlyListening = await currentlyListeningResponse.json();
  return currentlyListening;
}

export async function recentlyPlayedFetcher(): Promise<SpotifyRecentlyPlayed[]> {
  const recentlyPlayedResponse = await fetch(`${config.baseUrl}/api/spotify/recently-played`, {
    next: { revalidate: 60 },
  });
  const recentlyPlayed = await recentlyPlayedResponse.json();
  return recentlyPlayed;
}

export async function topFetcher(): Promise<{
  artists: SpotifyArtist[];
  tracks: SpotifyTrack[];
}> {
  const topResponse = await fetch(`${config.baseUrl}/api/spotify/top`, {
    next: { revalidate: 3600 },
  });
  const top = await topResponse.json();
  return top;
}
