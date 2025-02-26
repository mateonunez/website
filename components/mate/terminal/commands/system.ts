import { registry } from '../command-registry';
import type { Command } from '../types/commands';
import { formatCommandGroup } from '../utils/formatting';

export const helpCommand: Command = {
  name: 'help',
  description: 'Display available commands and usage information',
  handler: () => {
    return [
      'Here are the available commands:\n',
      ...registry.groups.map(formatCommandGroup),
      '\n\n💡 Tip: Type a command and press Enter to execute it, or press Tab to autocomplete.',
    ].join('\n');
  },
  aliases: ['h', '?', 'commands', 'info'],
};

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal output screen',
  handler: ({ tools }) => {
    tools.clearLines();
    return '';
  },
  aliases: ['c', 'cls', 'clean'],
};

export const systemCommands: Command[] = [clearCommand, helpCommand];
