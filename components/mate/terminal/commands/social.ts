import type { Command } from '../types/commands';
import { formatDuration } from '../utils/formatting';

export const githubCommunityCommand: Command = {
  name: 'github-community',
  description: 'GitHub sponsors & followers',
  handler: ({ dataSources }) => {
    const { data: githubData } = dataSources.github;
    if (!githubData) return 'No GitHub data.';

    const { profile } = githubData;
    if (!profile) return 'No GitHub profile data.';

    const { sponsors, followers, url } = profile;
    const sponsorCount = sponsors.length;
    const followerCount = followers.length;
    const sponsorsList = sponsors
      .slice(0, 3)
      .map((sponsor) => `  - ${sponsor.login}${sponsor.bio ? ` (${sponsor.bio})` : ''}`)
      .join('\n');

    return [
      'GitHub Community',
      `Sponsors (${sponsorCount})`,
      sponsorsList,
      `Followers: ${followerCount}+`,
      `More: ${url}`,
    ].join('\n');
  },
  aliases: ['community', 'gh', 'github', 'sponsors'],
};

export const nowPlayingCommand: Command = {
  name: 'now-playing',
  description: 'Current track',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData || !spotifyData.currentlyPlaying) return 'No current track.';

    const nowPlaying = spotifyData.currentlyPlaying;
    if (nowPlaying.isPlaying) {
      return `🎧 ${nowPlaying.title} — ${nowPlaying.artist} (${nowPlaying.album})\n${nowPlaying.url}`;
    }

    return '🔇 Nothing playing.';
  },
  aliases: ['music', 'spotify', 'np', 'playing'],
};

export const recentTracksCommand: Command = {
  name: 'recent-tracks',
  description: 'Last 5 tracks',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData?.recentlyPlayed) return 'No recent tracks.';

    const tracks = spotifyData.recentlyPlayed.slice(0, 5);
    const formattedTracks = tracks.map((item) => {
      const duration = formatDuration(item.duration);
      const playedAt = new Date(item.playedAt).toLocaleString();
      return `🎵 ${item.title} - 👤 ${item.artist} - ⏱️ ${duration} - 🕒 ${playedAt} - 🔗 ${item.url}`;
    });

    return ['Recent Tracks', ...formattedTracks].join('\n');
  },
  aliases: ['recently-played', 'rp', 'history'],
};

export const spotifyTopCommand: Command = {
  name: 'spotify-top',
  description: 'Top tracks & artists',
  handler: ({ dataSources }) => {
    const { data: spotifyData } = dataSources.spotify;
    if (!spotifyData || !spotifyData.topTracks || !spotifyData.topArtists) {
      return 'No top data.';
    }

    const { topTracks, topArtists } = spotifyData;

    // Format top tracks
    const tracksSection =
      topTracks.length > 0
        ? [
            '🎵 Tracks:',
            ...topTracks
              .slice(0, 5)
              .map(
                (track, index) =>
                  `  ${index + 1}. ${track.title} — ${track.artist}${track.url ? ` - ${track.url}` : ''}`,
              ),
          ]
        : ['No tracks.'];

    // Format top artists
    const artistsSection =
      topArtists.length > 0
        ? [
            '👤 Artists:',
            ...topArtists
              .slice(0, 5)
              .map(
                (artist, index) =>
                  `  ${index + 1}. ${artist.name}${artist.genres ? ` (${artist.genres.slice(0, 2).join(', ')})` : ''}${artist.url ? ` - ${artist.url}` : ''}`,
              ),
          ]
        : ['No artists.'];

    return ['Spotify Top', ...tracksSection, '', ...artistsSection].join('\n');
  },
  aliases: ['top-spotify', 'top', 'favorites', 'best'],
};

export const githubActivityCommand: Command = {
  name: 'github-activity',
  description: 'Recent GitHub activity',
  handler: ({ dataSources }) => {
    const { data: githubData } = dataSources.github;
    if (!githubData) return 'No GitHub data.';

    const { activities } = githubData;
    if (!activities) return 'No activity.';

    const { activities: activityList } = activities;
    if (!activityList || activityList.length === 0) return 'No recent activity.';

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

    return ['GitHub Activity', activitiesList || 'No recent activity'].join('\n');
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
