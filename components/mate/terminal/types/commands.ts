import type { DataSources, TerminalTools } from '../command-context';

export interface CommandContext {
  dataSources: DataSources;
  tools: TerminalTools;
  args?: string;
}

export type CommandHandlerResult = string | { type: 'streamed' };

export interface Command {
  name: string;
  description: string;
  handler: (context: CommandContext) => Promise<CommandHandlerResult> | CommandHandlerResult;
  aliases?: string[];
  usage?: string;
}

export interface CommandGroup {
  name: string;
  commands: Command[];
}

export interface CommandOutput {
  text: string;
  style?: string;
}

export interface CommandRegistry {
  groups: CommandGroup[];
  registerGroup(name: string, commands: Command[]): void;
  getAllCommands(): Command[];
  getCommandMap(): Map<string, Command>;
}
