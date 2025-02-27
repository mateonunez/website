import type { Command } from '../types/commands';
import { formatDuration } from '../utils/formatting';

export const githubCommunityCommand: Command = {
  name: 'github-community',
  description: 'View my GitHub community stats and sponsors',
  handler: ({ dataSources }) => {
    const { data: githubData } = dataSources.github;
    if (!githubData) return 'No GitHub data available at the moment.';

    const { profile } = githubData;
    if (!profile) return 'No GitHub profile data available at the moment.';

    const { sponsors, followers, url } = profile;
    const sponsorCount = sponsors.length;
    const followerCount = followers.length;
    const sponsorsList = sponsors
      .slice(0, 3)
      .map((sponsor) => `  - ${sponsor.login}${sponsor.bio ? ` (${sponsor.bio})` : ''}`)
      .join('\n');

    return [
      '─────────────────────────────',
      '🌟 GitHub Community Stats',
      '─────────────────────────────',
      `Sponsors (${sponsorCount}):`,
      sponsorsList,
      `Followers: ${followerCount}+`,
      `View more at: ${url}`,
      '─────────────────────────────',
    ].join('\n');
  },
  aliases: ['community', 'gh', 'github', 'sponsors'],
};

export const nowPlayingCommand: Command = {
  name: 'now-playing',
  description: 'Show currently playing music on Spotify',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData || !spotifyData.currentlyPlaying) return 'No music data available at the moment.';

    const nowPlaying = spotifyData.currentlyPlaying;
    if (nowPlaying.isPlaying) {
      return `🎧 Now playing: "${nowPlaying.title}" by ${nowPlaying.artist} from "${nowPlaying.album}"\nListen here: ${nowPlaying.url}`;
    }

    return '🔇 Not currently playing any music.';
  },
  aliases: ['music', 'spotify', 'np', 'playing'],
};

export const recentTracksCommand: Command = {
  name: 'recent-tracks',
  description: 'Show my recently played Spotify tracks',
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
  aliases: ['recently-played', 'rp', 'history'],
};

export const spotifyTopCommand: Command = {
  name: 'spotify-top',
  description: 'Show my top Spotify tracks and artists',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData || !spotifyData.topTracks || !spotifyData.topArtists) {
      return 'No Spotify top data available at the moment.';
    }

    const { topTracks, topArtists } = spotifyData;

    // Format top tracks
    const tracksSection =
      topTracks.length > 0
        ? [
            '🎵 Top Tracks:',
            ...topTracks
              .slice(0, 5)
              .map(
                (track, index) =>
                  `  ${index + 1}. ${track.title} - ${track.artist}${track.url ? ` - 🔗 ${track.url}` : ''}`,
              ),
          ]
        : ['No top tracks data available.'];

    // Format top artists
    const artistsSection =
      topArtists.length > 0
        ? [
            '👤 Top Artists:',
            ...topArtists
              .slice(0, 5)
              .map(
                (artist, index) =>
                  `  ${index + 1}. ${artist.name}${artist.genres ? ` (${artist.genres.slice(0, 2).join(', ')})` : ''}${artist.url ? ` - 🔗 ${artist.url}` : ''}`,
              ),
          ]
        : ['No top artists data available.'];

    return [
      '─────────────────────────────',
      '🎸 My Spotify Favorites',
      '─────────────────────────────',
      ...tracksSection,
      '',
      ...artistsSection,
      '─────────────────────────────',
    ].join('\n');
  },
  aliases: ['top-spotify', 'top', 'favorites', 'best'],
};

export const githubActivityCommand: Command = {
  name: 'github-activity',
  description: 'View my recent GitHub activity',
  handler: ({ dataSources }) => {
    const { data: githubData } = dataSources.github;
    if (!githubData) return 'No GitHub data available at the moment.';

    const { activities } = githubData;
    if (!activities) return 'No GitHub activity data available at the moment.';

    const { activities: activityList } = activities;
    if (!activityList || activityList.length === 0) return 'No recent GitHub activities found.';

    const recentActivities = activityList.slice(0, 5); // Show only 5 most recent

    const activityEmojis = {
      commit: '📝',
      pull_request: '🔄',
      issue: '🐛',
      review: '👀',
      star: '⭐',
      fork: '🍴',
      release: '🚀',
      other: '🔧',
    };

    const activitiesList = recentActivities
      .map((activity) => {
        const date = new Date(activity.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
        const emoji = activityEmojis[activity.type] || activityEmojis.other;
        return `  ${emoji} ${activity.title} (${activity.repo.fullName}) - ${date}`;
      })
      .join('\n');

    return [
      '─────────────────────────────',
      '🚀 Recent GitHub Activity',
      '─────────────────────────────',
      activitiesList || 'No recent activity',
      'View more on GitHub',
      '─────────────────────────────',
    ].join('\n');
  },
  aliases: ['last-activity', 'activity', 'recent', 'contributions'],
};

export const socialCommands: Command[] = [
  githubCommunityCommand,
  nowPlayingCommand,
  recentTracksCommand,
  spotifyTopCommand,
  githubActivityCommand,
];
