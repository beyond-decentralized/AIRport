import { system }          from '@airport/di';
import {
	Bus,
	BusHooks
}                          from '@node-ts/bus-core';
import { IEnvironment }    from './infra/Environment';
import { IEventFactory }   from './infra/EventFactory';
import { HandlerRegistry } from './infra/handler/HandlerRegistry';

const hwFlow = system('airport').lib('hw-flow');

export const BUS              = hwFlow.token<Bus>('Bus');
export const BUS_HOOKS        = hwFlow.token<BusHooks>('BusHooks');
export const ENV              = hwFlow.token<IEnvironment>('IEnvironment');
export const EVENT_FACTORY    = hwFlow.token<IEventFactory>('IEventFactory');
export const HANDLER_REGISTRY = hwFlow.token<HandlerRegistry>('HandlerRegistry');
