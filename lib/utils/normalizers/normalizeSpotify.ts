import type {
  NormalizedCurrentlyPlaying,
  NormalizedRecentlyPlayed,
  SpotifyArtist,
  SpotifyCurrentlyPlaying,
  SpotifyRecentlyPlayed,
  SpotifyTrack,
  TopArtist,
  TopTrack,
} from '@/types/spotify';

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

export const normalizeRecentlyPlayed = (data: SpotifyRecentlyPlayed): NormalizedRecentlyPlayed[] => {
  return data.items.map((item) => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists?.map(({ name }) => name).join(' - '),
    album: item.track.album?.name,
    playedAt: item.played_at,
    url: item.track.external_urls?.spotify,
    duration: item.track.duration_ms,
    thumbnail: item.track.album?.images[0]?.url,
  }));
};

export const normalizeArtists = (data: SpotifyArtist): TopArtist => ({
  id: data.id,
  name: data.name,
  popularity: data.popularity,
  genres: data.genres || [],
  url: data.external_urls?.spotify,
  image: data.images[0].url,
  followers: data.followers?.total || 0,
});

export const normalizeTracks = (data: SpotifyTrack): TopTrack => ({
  id: data.id,
  title: data.name,
  artist: data.artists?.map(({ name }) => name).join(' - '),
  album: data.album?.name,
  thumbnail: data.album?.images[0]?.url,
  url: data.external_urls?.spotify,
  duration: data.duration_ms,
  popularity: data.popularity,
  preview_url: data.preview_url,
});
