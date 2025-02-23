import { ABOUT_MESSAGES } from './constants';
import type {
  DataSources,
  TerminalTools,
} from './command-context';

interface CommandContext {
  dataSources: DataSources;
  tools: TerminalTools;
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
    handler: ({ tools }) => {
      tools.clearLines();
      return '';
    },
    aliases: ['c', 'cls'],
  },
  {
    name: 'help',
    description: 'Show this awesome command list',
    handler: () => {
      const formatGroup = (group: CommandGroup): string => {
        const commands = group.commands
          .map((cmd) => {
            const aliasText = cmd.aliases?.length ? ` (aliases: ${cmd.aliases.join(', ')})` : '';
            return `  • ${cmd.name.padEnd(15)} ${cmd.description}${aliasText}`;
          })
          .join('\n');
        return `\n=== ${group.name} Commands ===\n${commands}`;
      };

      return [
        '🌟 Welcome to the Terminal 🌟',
        'Here are the available commands:\n',
        ...commandGroups.map(formatGroup),
        '\n💡 Tip: Type a command and press Enter to execute it, or press Tab to autocomplete.',
      ].join('\n');
    },
    aliases: ['h'],
  },
];

const personalCommands: Command[] = [
  {
    name: 'whoami',
    description: 'More about me',
    handler: () => [...ABOUT_MESSAGES].join('\n'),
    aliases: ['about'],
  },
];

const socialCommands: Command[] = [
  {
    name: 'music',
    description: 'Catch my current vibe',
    handler: ({ dataSources }) => {
      const { data: spotifyData } = dataSources.spotify;
      if (!spotifyData) return 'No music data available at the moment.';

      return spotifyData.isPlaying
        ? `Now playing: "${spotifyData.title}" by ${spotifyData.artist} from ${spotifyData.album}"`
        : 'Not currently playing any music.';
    },
    aliases: ['spotify', 'np'],
  },
  {
    name: 'community',
    description: 'Meet my GitHub crew',
    handler: ({ dataSources }) => {
      const { data: githubData } = dataSources.github;
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

const aiCommands: Command[] = [
  {
    name: 'ait',
    description: 'Play with AIt',
    handler: () =>
      `Hey there! I'm _AIt_ (acts like "alt" /ɔːlt/, but also pronounced as "eight" /eɪt/). It depends. 🤷‍♂️`,
  },
];

export const commandGroups: CommandGroup[] = [
  { name: 'System', commands: systemCommands },
  { name: 'Personal', commands: personalCommands },
  { name: 'Social', commands: socialCommands },
  { name: 'AI', commands: aiCommands },
];

export const getAllCommands = (): Command[] => {
  return commandGroups.flatMap((group) => group.commands);
};

export const getCommandMap = (): Map<string, Command> => {
  const map = new Map<string, Command>();
  const commands = getAllCommands();

  for (const command of commands) {
    map.set(command.name.toLowerCase().trim(), command);
    command.aliases?.forEach((alias) => map.set(alias.toLowerCase().trim(), command));
  }

  return map;
};
