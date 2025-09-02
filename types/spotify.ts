export interface SpotifyAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyArtist {
  popularity: number;
  genres: string[];
  id: string;
  name: string;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  images?: SpotifyImage[];
  followers?: {
    total: number;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  type: string;
  duration_ms: number;
  artists: SpotifyArtist[];
  album: {
    id: string;
    name: string;
    images: SpotifyImage[];
    release_date: string;
    uri: string;
  };
  external_urls: {
    spotify: string;
  };
  [key: string]: any;
}

export interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack;
  progress_ms: number;
  timestamp: number;
}

export interface SpotifyRecentlyPlayed {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
    context: {
      type: string;
      uri: string;
    };
  }>;
}

export interface SpotifyTopArtists {
  items: SpotifyArtist[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyTopTracks {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyData {
  currentlyPlaying: SpotifyCurrentlyPlaying | null;
  recentlyPlayed: SpotifyRecentlyPlayed | null;
  topArtists: SpotifyTopArtists | null;
  topTracks: SpotifyTopTracks | null;
}

export interface NormalizedCurrentlyPlaying {
  id?: string;
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  album?: string;
  thumbnail?: string;
  url?: string;
  progress?: number;
  duration?: number;
}

export interface NormalizedRecentlyPlayed {
  id: string;
  title: string;
  artist: string;
  album: string;
  playedAt: string;
  url: string;
  duration: number;
  thumbnail: string;
}

export interface TopArtist {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  url: string;
  image: string;
  followers: number;
}

export interface TopTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  thumbnail: string;
  duration: number;
  popularity: number;
  preview_url: string | null;
}

export interface TopData {
  artists: TopArtist[];
  tracks: TopTrack[];
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers?: {
    total: number;
  };
  images?: SpotifyImage[];
  country?: string;
  product?: string;
  email?: string;
  type?: string;
  uri?: string;
}

export interface NormalizedSpotifyProfile {
  id: string;
  name: string;
  avatar: string | null;
  followers: number;
  url: string;
  country?: string;
}

export interface SpotifyPlaylistOwner {
  display_name?: string;
  external_urls?: { spotify: string };
  id: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description?: string;
  images?: SpotifyImage[];
  external_urls: { spotify: string };
  tracks: { total: number };
  owner: SpotifyPlaylistOwner;
  public?: boolean;
}

export interface SpotifyPlaylists {
  items: SpotifyPlaylist[];
  limit: number;
  offset: number;
  total: number;
}

export interface NormalizedPlaylist {
  id: string;
  name: string;
  cover: string | null;
  url: string;
  tracks: number;
  owner: string;
  description?: string;
  public?: boolean;
}
