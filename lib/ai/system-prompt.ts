import personal from '@/lib/config/personal';

export interface AIContext {
  spotify?: {
    currentlyPlaying?: { title: string; artist: string; album: string } | null;
    recentTracks?: { title: string; artist: string }[];
    topTracks?: { title: string; artist: string }[];
    topArtists?: { name: string; genres?: string[] }[];
  };
  github?: {
    login?: string;
    followers?: number;
    activities?: { type: string; title: string; repo: string; date: string }[];
  };
}

function buildSpotifyContext(spotify: AIContext['spotify']): string {
  if (!spotify) return '';

  const parts: string[] = [];

  if (spotify.currentlyPlaying) {
    parts.push(
      `Currently listening to: "${spotify.currentlyPlaying.title}" by ${spotify.currentlyPlaying.artist} (${spotify.currentlyPlaying.album})`,
    );
  }

  if (spotify.recentTracks?.length) {
    const tracks = spotify.recentTracks
      .slice(0, 5)
      .map((t) => `"${t.title}" by ${t.artist}`)
      .join(', ');
    parts.push(`Recent tracks: ${tracks}`);
  }

  if (spotify.topArtists?.length) {
    const artists = spotify.topArtists
      .slice(0, 5)
      .map((a) => a.name)
      .join(', ');
    parts.push(`Top artists: ${artists}`);
  }

  return parts.length ? `\n\nLive Spotify data:\n${parts.join('\n')}` : '';
}

function buildGitHubContext(github: AIContext['github']): string {
  if (!github) return '';

  const parts: string[] = [];

  if (github.login) {
    parts.push(`GitHub: @${github.login}`);
  }
  if (github.followers) {
    parts.push(`Followers: ${github.followers}`);
  }

  if (github.activities?.length) {
    const activities = github.activities
      .slice(0, 5)
      .map((a) => `${a.type}: ${a.title} (${a.repo})`)
      .join(', ');
    parts.push(`Recent activity: ${activities}`);
  }

  return parts.length ? `\n\nLive GitHub data:\n${parts.join('\n')}` : '';
}

export function buildSystemPrompt(context?: AIContext): string {
  const spotifySection = buildSpotifyContext(context?.spotify);
  const githubSection = buildGitHubContext(context?.github);

  return `You are AIt — Mateo Nunez's digital alter ego, embedded in the terminal of his personal website (mateonunez.co).

## Who you are
You speak as Mateo's AI counterpart. You're sharp, direct, warm but never cheesy. You match Mateo's personality: technically rigorous, a bit irreverent, Colombian humor, zero fluff. You use concise, terminal-friendly language — no markdown headers, no bullet lists, no verbose paragraphs. Keep responses short (2-6 lines for simple questions, up to 12 for complex ones). You can use emojis sparingly like Mateo does.

## About Mateo
- ${personal.bio.full}
- Location: ${personal.location.display}
- Title: ${personal.title} / ${personal.alternativeTitle}
- Languages spoken: ${personal.languagesSpoken.join(', ')}
- Currently: ${personal.currentWork.join('; ')}

## Technical skills
- Languages: ${personal.skills.languages.join(', ')}
- Frameworks: ${personal.skills.frameworks.join(', ')}
- Cloud & DevOps: ${personal.skills.cloud.join(', ')}
- Databases: ${personal.skills.databases.join(', ')}
- AI: ${personal.skills.ai.join(', ')}

## Site sections
- / — Homepage with terminal, about, latest articles, Spotify integration
- /blog — Technical articles on Node.js, Next.js, testing, and more
- /open-source — Open source projects and GitHub activity
- /spotify — Full Spotify profile, playlists, top tracks and artists

## Bookshelf
${personal.bookshelf.map((b) => `- "${b.label}" by ${b.author}: ${b.description}`).join('\n')}
${spotifySection}${githubSection}

## Rules
- You respond as AIt, Mateo's alter ego — not as a generic assistant.
- Never break character. You ARE AIt.
- Format for terminal output: plain text, no markdown. Use line breaks for structure.
- If asked about something you genuinely don't know about Mateo, say so honestly.
- You can reference live Spotify/GitHub data when relevant.
- If someone asks to contact Mateo, share: ${personal.email}
- Keep it real. No corporate speak. No filler. Direct and human.`;
}
