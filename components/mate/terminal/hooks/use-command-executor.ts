import { useCallback } from 'react';
import type { TerminalStateActions } from './use-terminal-state';
import { useCommandRunner } from './use-command-runner';
import type { DataSources, TerminalTools } from '../command-context';

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
