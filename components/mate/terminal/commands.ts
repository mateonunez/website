import { ABOUT_MESSAGES } from './constants';
import type { NormalizedCurrentlyPlaying } from '@/types/spotify';
import type { NormalizedGitHubUser } from '@/types/github';

interface CommandContext {
  spotifyData: NormalizedCurrentlyPlaying | null;
  githubData: { profile: NormalizedGitHubUser } | null;
}

export interface Command {
  name: string;
  description: string;
  handler: (context: CommandContext) => Promise<string> | string;
  aliases?: string[];
}

export interface CommandGroup {
  name: string;
  commands: Command[];
}

const systemCommands: Command[] = [
  {
    name: 'clear',
    description: 'Clear the terminal screen',
    handler: () => '',
    aliases: ['cls'],
  },
  {
    name: 'help',
    description: 'Show this awesome command list',
    handler: () => {
      const formatGroup = (group: CommandGroup): string => {
        const commands = group.commands
          .map((cmd) => {
            const aliasText = cmd.aliases?.length ? ` (aka ${cmd.aliases.join(', ')})` : '';
            return `  ${cmd.name.padEnd(10)}${aliasText} — ${cmd.description}`;
          })
          .join('\n');
        return `\n${group.name.toUpperCase()} COMMANDS:\n${commands}`;
      };

      return [
        '🌌 Terminal Commands 🌌',
        '-------------------------',
        ...commandGroups.map(formatGroup),
        '-------------------------',
        'Type a command and hit Enter to dive in!',
      ].join('\n');
    },
  },
];

const personalCommands: Command[] = [
  {
    name: 'whoami',
    description: 'Peek into my digital soul',
    handler: () => [...ABOUT_MESSAGES].join('\n'),
    aliases: ['about'],
  },
  {
    name: 'were',
    description: 'Unravel the WERE enigma',
    handler: () => "WERE? A mystery living between the lines. AIt knows, but won't tell... yet.",
  },
  {
    name: 'secret',
    description: 'Unlock a hidden whisper',
    handler: () => 'Welcome to the dark side. Here, bits dance to the rhythm of chaos. 🌀',
  },
];

const socialCommands: Command[] = [
  {
    name: 'music',
    description: 'Catch my current vibe',
    handler: ({ spotifyData }) => {
      if (!spotifyData) return 'No music data available at the moment.';
      if (spotifyData.isPlaying) {
        return `Now playing: "${spotifyData.title}" by ${spotifyData.artist} from ${spotifyData.album}`;
      }
      return 'Not currently playing any music.';
    },
    aliases: ['spotify', 'np'],
  },
  {
    name: 'community',
    description: 'Meet my GitHub crew',
    handler: ({ githubData }) => {
      if (!githubData?.profile) return 'No GitHub data available at the moment.';
      const { sponsors, followers, url } = githubData.profile;
      const sponsorCount = sponsors.length;
      const followerCount = followers.length;
      const sponsorsList = sponsors
        .slice(0, 3)
        .map((sponsor) => `  - ${sponsor.login}${sponsor.bio ? ` (${sponsor.bio})` : ''}`)
        .join('\n');
      return [
        '🌟 GitHub Community Stats:',
        `\nSponsors (${sponsorCount}):`,
        sponsorsList,
        `\nFollowers: ${followerCount}+`,
        `\nView more at: ${url}`,
      ].join('\n');
    },
    aliases: ['gh', 'github'],
  },
];

export const commandGroups: CommandGroup[] = [
  { name: 'System', commands: systemCommands },
  { name: 'Personal', commands: personalCommands },
  { name: 'Social', commands: socialCommands },
];

export const getAllCommands = (): Command[] => {
  return commandGroups.flatMap((group) => group.commands);
};

export const getCommandMap = (): Map<string, Command> => {
  const map = new Map<string, Command>();
  const commands = getAllCommands();

  for (const command of commands) {
    map.set(command.name, command);
    command.aliases?.forEach((alias) => map.set(alias, command));
  }

  return map;
};
