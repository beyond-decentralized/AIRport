import { HandlesMessage } from '@node-ts/bus-core';
import { SchemaQueryCmd } from './SchemaQueryCmd';

@HandlesMessage(SchemaQueryCmd)
export class SchemaQueryBusHandler {

	async handle(command: SchemaQueryCmd): Promise<void> {

	}
}
