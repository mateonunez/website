import { registry } from '../command-registry';
import { aitCommand } from './ait';
import { linksCommand, siteCommand } from './navigation';
import { personalCommands } from './personal';
import { socialCommands } from './social';
import { systemCommands } from './system';

registry.registerGroup('System', systemCommands);
registry.registerGroup('Personal', personalCommands);
registry.registerGroup('Social', socialCommands);
registry.registerGroup('Navigation', [linksCommand, siteCommand]);
registry.registerGroup('Fun', [aitCommand]);

export { registry as commandRegistry };
