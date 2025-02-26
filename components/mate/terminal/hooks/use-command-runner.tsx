import { useCallback, useMemo } from 'react';
import type { DataSources, TerminalTools } from '../command-context';
import { commandRegistry } from '../commands/index';

type CommandResult = {
  success: boolean;
  output: string;
};

interface CommandRunnerOptions {
  dataSources: DataSources;
  tools: TerminalTools;
}

export function useCommandRunner({ dataSources, tools }: CommandRunnerOptions) {
  const commandMap = useMemo(() => commandRegistry.getCommandMap(), []);

  const runCommand = useCallback(
    async (input: string): Promise<CommandResult> => {
      const trimmedInput = input.trim().toLowerCase();
      const command = commandMap.get(trimmedInput);

      if (!command) {
        return {
          success: false,
          output: 'Unknown command. Type "help" for available commands.',
        };
      }

      try {
        const output = await command.handler({ dataSources, tools });
        return { success: true, output };
      } catch (error) {
        console.error('Error executing command:', error);
        return {
          success: false,
          output: 'An error occurred while executing the command.',
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
