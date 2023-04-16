import config from 'lib/config';

export async function currentlyListeningFetcher() {
  const currentlyListeningResponse = await fetch(
    `${config.baseUrl}/api/spotify/currently-listening`
  );
  const currentlyListening = await currentlyListeningResponse.json();
  return currentlyListening;
}

export async function recentlyPlayedFetcher() {
  const recentlyPlayedResponse = await fetch(`${config.baseUrl}/api/spotify/recently-played`);
  const recentlyPlayed = await recentlyPlayedResponse.json();
  return recentlyPlayed;
}

export async function topFetcher() {
  const topResponse = await fetch(`${config.baseUrl}/api/spotify/top`);
  const top = await topResponse.json();
  return top;
}
