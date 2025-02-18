import type { SpotifyTrack, SpotifyArtist, SpotifyCurrentlyPlaying, SpotifyRecentlyPlayed } from '@/types/spotify';

interface NormalizedSpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  thumbnail: string;
  url: string;
  duration: number;
}

interface NormalizedCurrentlyPlaying extends NormalizedSpotifyTrack {
  isPlaying: boolean;
  progress: number;
}

interface NormalizedRecentlyPlayed extends NormalizedSpotifyTrack {
  playedAt: string;
}

interface NormalizedArtist {
  id: string;
  name: string;
  popularity: number;
  genres: string;
  url: string;
  thumbnail: string;
}

export const normalizeCurrentlyListening = (data: SpotifyCurrentlyPlaying): NormalizedCurrentlyPlaying => ({
  id: data.item.id,
  isPlaying: data.is_playing,
  title: data.item.name,
  artist: data.item.artists?.map(({ name }) => name).join(' '),
  album: data.item.album?.name,
  thumbnail: data.item.album?.images[0]?.url,
  url: data.item.external_urls?.spotify,
  progress: data.progress_ms,
  duration: data.item.duration_ms,
});

export const normalizeRecentlyPlayed = (data: SpotifyRecentlyPlayed['items'][0]): NormalizedRecentlyPlayed => ({
  title: data.track.name,
  artist: data.track.artists?.map(({ name }) => name).join(' - '),
  album: data.track.album?.name,
  thumbnail: data.track.album?.images[0]?.url,
  url: data.track.external_urls?.spotify,
  playedAt: data.played_at,
  duration: data.track.duration_ms,
  id: '',
});

export const normalizeArtists = (data: SpotifyArtist): NormalizedArtist => ({
  id: data.id,
  name: data.name,
  popularity: data.popularity,
  genres: data.genres?.join(' '),
  url: data.external_urls?.spotify,
  thumbnail: data.images[0].url,
});

export const normalizeTracks = (data: SpotifyTrack): NormalizedSpotifyTrack => ({
  id: data.id,
  title: data.name,
  artist: data.artists?.map(({ name }) => name).join(' - '),
  album: data.album?.name,
  thumbnail: data.album?.images[0]?.url,
  url: data.external_urls?.spotify,
  duration: data.duration_ms,
});
