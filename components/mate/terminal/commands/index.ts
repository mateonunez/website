import { registry } from '../command-registry';
import { personalCommands } from './personal';
import { socialCommands } from './social';
import { systemCommands } from './system';

registry.registerGroup('System', systemCommands);
registry.registerGroup('Personal', personalCommands);
registry.registerGroup('Social', socialCommands);

export { registry as commandRegistry };
