import { system } from '@airport/di';
const terminal = system('airport').lib('hw-flow');
export const BUS = terminal.token('Bus');
export const BUS_HOOKS = terminal.token('BusHooks');
//# sourceMappingURL=tokens.js.map