import config from '@/lib/config';

export async function currentlyListeningFetcher() {
  const currentlyListeningResponse = await fetch(`${config.baseUrl}/api/spotify/currently-listening`, {
    next: { revalidate: 5 },
  });
  const currentlyListening = await currentlyListeningResponse.json();
  return currentlyListening;
}

export async function recentlyPlayedFetcher() {
  const recentlyPlayedResponse = await fetch(`${config.baseUrl}/api/spotify/recently-played`, {
    next: { revalidate: 60 },
  });
  const recentlyPlayed = await recentlyPlayedResponse.json();
  return recentlyPlayed;
}

export async function topFetcher() {
  const topResponse = await fetch(`${config.baseUrl}/api/spotify/top`, {
    next: { revalidate: 3600 },
  });
  const top = await topResponse.json();
  return top;
}
