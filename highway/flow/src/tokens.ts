import { system } from '@airport/di';
import {
	Bus,
	BusHooks
}                 from '@node-ts/bus-core';

const terminal = system('airport').lib('hw-flow');

export const BUS       = terminal.token<Bus>('Bus');
export const BUS_HOOKS = terminal.token<BusHooks>('BusHooks');
