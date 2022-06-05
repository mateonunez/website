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
  artist: track.artists?.map(({ name }) => name).join(' - '),
  album: track.album?.name,
  thumbnail: track.album?.images[0]?.url,
  url: track.external_urls?.spotify,
  playedAt: played_at,
  duration: track.duration_ms
});

export const normalizeArtists = ({ name, popularity, genres, external_urls, images }) => ({
  name,
  popularity,
  genres: genres?.join(' '),
  url: external_urls?.spotify,
  thumbnail: images[0].url
});

export const normalizeTracks = ({ name, artists, album, external_urls, duration_ms }) => ({
  title: name,
  artist: artists?.map(({ name }) => name).join(' - '),
  album: album?.name,
  thumbnail: album?.images[0]?.url,
  url: external_urls?.spotify,
  duration: duration_ms
});
