import { useCallback, useMemo } from 'react';
import type { DataSources, TerminalTools } from '../command-context';
import { commandRegistry } from '../commands/index';

export type CommandResult = {
  success: boolean;
  output: string;
  streamed?: boolean;
};

interface CommandRunnerOptions {
  dataSources: DataSources;
  tools: TerminalTools;
}

export function useCommandRunner({ dataSources, tools }: CommandRunnerOptions) {
  const commandMap = useMemo(() => commandRegistry.getCommandMap(), []);

  const runCommand = useCallback(
    async (input: string): Promise<CommandResult> => {
      const trimmedInput = input.trim();
      const spaceIndex = trimmedInput.indexOf(' ');
      const commandName =
        spaceIndex === -1 ? trimmedInput.toLowerCase() : trimmedInput.slice(0, spaceIndex).toLowerCase();
      const args = spaceIndex === -1 ? undefined : trimmedInput.slice(spaceIndex + 1).trim() || undefined;

      const command = commandMap.get(commandName);

      if (!command) {
        return {
          success: false,
          output: 'Unknown command. Type "help".',
        };
      }

      try {
        const result = await command.handler({ dataSources, tools, args });

        if (typeof result === 'object' && result.type === 'streamed') {
          return { success: true, output: '', streamed: true };
        }

        return { success: true, output: result as string };
      } catch (error) {
        console.error('Error executing command:', error);
        return {
          success: false,
          output: 'Command error.',
        };
      }
    },
    [commandMap, dataSources, tools],
  );

  const getMatchingCommands = useCallback(
    (input: string): string[] => {
      const trimmedInput = input.trim().toLowerCase();
      return Array.from(commandMap.keys()).filter((cmd) => cmd.startsWith(trimmedInput));
    },
    [commandMap],
  );

  return { runCommand, getMatchingCommands };
}
