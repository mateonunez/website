import type { Command } from '../types/commands';
import { formatDuration } from '../utils/formatting';

export const communityCommand: Command = {
  name: 'community',
  description: 'Meet my GitHub crew',
  handler: ({ dataSources }) => {
    const { data: githubData } = dataSources.github;
    if (!githubData) return 'No GitHub data available at the moment.';

    const { sponsors, followers, url } = githubData;
    const sponsorCount = sponsors.length;
    const followerCount = followers.length;
    const sponsorsList = sponsors
      .slice(0, 3)
      .map((sponsor) => `  - ${sponsor.login}${sponsor.bio ? ` (${sponsor.bio})` : ''}`)
      .join('\n');

    return [
      // biome-ignore lint/nursery/noSecrets: it's not a secret
      '─────────────────────────────',
      '🌟 GitHub Community Stats',
      // biome-ignore lint/nursery/noSecrets: it's not a secret
      '─────────────────────────────',
      `Sponsors (${sponsorCount}):`,
      sponsorsList,
      `Followers: ${followerCount}+`,
      `View more at: ${url}`,
      // biome-ignore lint/nursery/noSecrets: it's not a secret
      '─────────────────────────────',
    ].join('\n');
  },
  aliases: ['gh', 'github'],
};

export const musicCommand: Command = {
  name: 'music',
  description: 'Catch my current vibe',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData?.currentlyPlaying) return 'No music data available at the moment.';

    return spotifyData.currentlyPlaying.isPlaying
      ? `🎧 Now playing: "${spotifyData.currentlyPlaying.title}" by ${spotifyData.currentlyPlaying.artist} from "${spotifyData.currentlyPlaying.album}"`
      : '🔇 Not currently playing any music.';
  },
  aliases: ['spotify', 'np'],
};

export const recentlyPlayedCommand: Command = {
  name: 'recently-played',
  description: 'Show my recently played tracks',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData?.recentlyPlayed) return 'No recently played music data available.';

    const tracks = spotifyData.recentlyPlayed.slice(0, 5);
    const formattedTracks = tracks.map((item) => {
      const duration = formatDuration(item.duration);
      const playedAt = new Date(item.playedAt).toLocaleString();
      return `🎵 ${item.title} - 👤 ${item.artist} - ⏱️ ${duration} - 🕒 ${playedAt} - 🔗 ${item.url}`;
    });

    return ['=== Recently Played Tracks ===', ...formattedTracks, 'ℹ️ Showing last 5 tracks'].join('\n');
  },
  aliases: ['rp'],
};

export const socialCommands: Command[] = [musicCommand, recentlyPlayedCommand, communityCommand];
