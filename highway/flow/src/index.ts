import { DI }        from '@airport/di';
import { BusHooks }  from '@node-ts/bus-core';
import { BUS_HOOKS } from './tokens';

export * from './infra/Bus';

DI.set(BUS_HOOKS, BusHooks);
