import type { Command, CommandGroup } from '../types/commands';

export const formatCommand = (cmd: Command): string => {
  const nameAndAliases = cmd.aliases?.length ? `${cmd.name} (${cmd.aliases.join(', ')})` : cmd.name;
  const paddedName = nameAndAliases.padEnd(20);
  return `  ${paddedName} - ${cmd.description}`;
};

export const formatCommandGroup = (group: CommandGroup): string => {
  const commands = group.commands.map(formatCommand).join('\n');
  return `\n${group.name}\n${commands}`;
};

export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};
