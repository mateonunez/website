// biome-ignore lint/nursery/noExportedImports: it's ok
import { registry } from '../command-registry';
import { systemCommands } from './system';
import { personalCommands } from './personal';
import { socialCommands } from './social';
import { aitCommand } from './ait';

registry.registerGroup('System', systemCommands);
registry.registerGroup('Personal', personalCommands);
registry.registerGroup('Social', socialCommands);
registry.registerGroup('AI', [aitCommand]);

export { registry as commandRegistry };
