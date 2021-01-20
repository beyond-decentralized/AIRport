import { HandlesMessage } from '@node-ts/bus-core';
import { QueryCmd }       from './QueryCmd';

@HandlesMessage(QueryCmd)
export class QueryBusHandler {

	async handle(command: QueryCmd): Promise<void> {

	}

}
