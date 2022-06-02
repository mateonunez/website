export const normalizeCurrentlyListening = ({ is_playing, progress_ms, item }) => ({
  isPlaying: is_playing,
  title: item.name,
  artist: item.artists?.map(({ name }) => name).join(' '),
  album: item.album?.name,
  thumbnail: item.album?.images[0]?.url,
  url: item.external_urls?.spotify,
  progress: progress_ms,
  duration: item.duration_ms
});

export const normalizeRecentlyPlayed = ({ track, played_at }) => ({
  title: track.name,
  artist: track.artists?.map(({ name }) => name).join(' '),
  album: track.album?.name,
  thumbnail: track.album?.images[0]?.url,
  url: track.external_urls?.spotify,
  playedAt: played_at,
  duration: track.duration_ms
});
