import type { Command, CommandGroup, CommandRegistry } from './types/commands';

class CommandRegistryImpl implements CommandRegistry {
  groups: CommandGroup[] = [];

  registerGroup(name: string, commands: Command[]): void {
    const existingGroupIndex = this.groups.findIndex((group) => group.name === name);
    if (existingGroupIndex !== -1) {
      this.groups[existingGroupIndex] = { name, commands };
    } else {
      this.groups.push({ name, commands });
    }
  }

  getAllCommands(): Command[] {
    return this.groups.flatMap((group) => group.commands);
  }

  getCommandMap(): Map<string, Command> {
    const map = new Map<string, Command>();
    const commands = this.getAllCommands();

    for (const command of commands) {
      map.set(command.name.toLowerCase().trim(), command);
      command.aliases?.forEach((alias) => {
        map.set(alias.toLowerCase().trim(), command);
      });
    }

    return map;
  }
}

export const registry = new CommandRegistryImpl();
