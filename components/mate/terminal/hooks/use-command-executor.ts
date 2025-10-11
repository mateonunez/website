import { useCallback } from 'react';
import { trackTerminal } from '@/lib/analytics';
import type { DataSources, TerminalTools } from '../command-context';
import { useCommandRunner } from './use-command-runner';
import type { TerminalStateActions } from './use-terminal-state';

interface CommandExecutorOptions {
  dataSources: DataSources;
  tools: TerminalTools;
  actions: Pick<TerminalStateActions, 'addCompletedLines' | 'addToHistory'>;
}

export function useCommandExecutor({ dataSources, tools, actions }: CommandExecutorOptions) {
  const { runCommand, getMatchingCommands } = useCommandRunner({ dataSources, tools });

  const executeCommand = useCallback(
    async (input: string) => {
      const result = await runCommand(input);

      const commandName = input.trim().split(' ')[0];
      trackTerminal.commandExecuted(commandName, result.success !== false);

      const newLines = [
        { text: input, showPrompt: true },
        ...result.output.split('\n').map((text) => ({ text, showPrompt: false })),
      ];
      actions.addCompletedLines(newLines);
      actions.addToHistory(input);
    },
    [runCommand, actions],
  );

  return { executeCommand, getMatchingCommands };
}
