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
  genres: any;
  id: string;
  name: string;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  images?: SpotifyImage[];
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
  [key: string]: any;
}
