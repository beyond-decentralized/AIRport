import { Bus, BusHooks } from '@node-ts/bus-core';
import { IEnvironment } from './infra/Environment';
import { IEventFactory } from './infra/EventFactory';
import { HandlerRegistry } from './infra/handler/HandlerRegistry';
export declare const BUS: import("@airport/di").IDiToken<Bus>;
export declare const BUS_HOOKS: import("@airport/di").IDiToken<BusHooks>;
export declare const ENV: import("@airport/di").IDiToken<IEnvironment>;
export declare const EVENT_FACTORY: import("@airport/di").IDiToken<IEventFactory>;
export declare const HANDLER_REGISTRY: import("@airport/di").IDiToken<HandlerRegistry>;
//# sourceMappingURL=tokens.d.ts.map