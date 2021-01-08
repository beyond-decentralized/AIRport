import { system } from '@airport/di';
const hwFlow = system('airport').lib('hw-flow');
export const BUS = hwFlow.token('Bus');
export const BUS_HOOKS = hwFlow.token('BusHooks');
export const ENV = hwFlow.token('IEnvironment');
export const EVENT_FACTORY = hwFlow.token('IEventFactory');
export const HANDLER_REGISTRY = hwFlow.token('HandlerRegistry');
//# sourceMappingURL=tokens.js.map