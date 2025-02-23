import { useCallback, useMemo } from 'react';
import { getCommandMap } from '../commands';
import type { DataSources, TerminalTools } from '../command-context';
import type { TerminalStateActions } from './use-terminal-state';

interface CommandExecutorOptions {
  dataSources: DataSources;
  tools: TerminalTools;
  actions: Pick<TerminalStateActions, 'addCompletedLines' | 'addToHistory'>;
}

export function useCommandExecutor({ dataSources, tools, actions }: CommandExecutorOptions) {
  const commandMap = useMemo(() => getCommandMap(), []);

  const executeCommand = useCallback(
    async (input: string) => {
      const trimmedInput = input.trim().toLowerCase();
      const command = commandMap.get(trimmedInput);
      let response: string;

      try {
        if (command) {
          response = await command.handler({ dataSources, tools });
        } else {
          response = 'Unknown command. Type "help" for available commands.';
        }
      } catch (error) {
        console.error('Error executing command:', error);
        response = 'An error occurred while executing the command.';
      }

      const newLines = [
        { text: input, showPrompt: true },
        ...response.split('\n').map((text) => ({ text, showPrompt: false })),
      ];

      actions.addCompletedLines(newLines);
      actions.addToHistory(input);
    },
    [commandMap, dataSources, tools, actions],
  );

  const getMatchingCommands = useCallback(
    (input: string) => {
      return Array.from(commandMap.keys()).filter((cmd) => cmd.startsWith(input.trim().toLowerCase()));
    },
    [commandMap],
  );

  return {
    executeCommand,
    getMatchingCommands,
  };
}
