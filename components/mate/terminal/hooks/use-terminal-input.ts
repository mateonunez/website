import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import type { TerminalState, TerminalStateActions } from './use-terminal-state';

interface TerminalInputOptions {
  state: Pick<TerminalState, 'userInput' | 'commandHistory' | 'historyIndex'>;
  actions: Pick<TerminalStateActions, 'setUserInput' | 'updateHistoryIndex' | 'addCompletedLines'>;
  executeCommand: (input: string) => Promise<void>;
  getMatchingCommands: (input: string) => string[];
}

export function useTerminalInput({ state, actions, executeCommand, getMatchingCommands }: TerminalInputOptions) {
  const handleUserInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const { userInput, commandHistory, historyIndex } = state;

      switch (e.key) {
        case 'Enter':
          if (userInput.trim()) {
            void executeCommand(userInput);
          } else {
            actions.addCompletedLines([{ text: '', showPrompt: true }]);
          }
          actions.setUserInput('');
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            actions.updateHistoryIndex(newIndex);
            actions.setUserInput(commandHistory[newIndex]);
          }
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (historyIndex > -1) {
            const newIndex = historyIndex - 1;
            actions.updateHistoryIndex(newIndex);
            actions.setUserInput(newIndex === -1 ? '' : commandHistory[newIndex]);
          }
          break;

        case 'Tab':
          e.preventDefault();
          // biome-ignore lint/correctness/noSwitchDeclarations: it's a switch statement
          const matchingCommands = getMatchingCommands(userInput);
          if (matchingCommands.length === 1) {
            actions.setUserInput(matchingCommands[0]);
          } else if (matchingCommands.length > 1) {
            actions.addCompletedLines([
              { text: `Possible completions: ${matchingCommands.join(', ')}`, showPrompt: false },
            ]);
          }
          break;
      }
    },
    [state, actions, executeCommand, getMatchingCommands],
  );

  return handleUserInput;
}
