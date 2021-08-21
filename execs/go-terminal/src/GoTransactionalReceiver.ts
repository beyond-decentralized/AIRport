import { IQueryContext } from '@airport/air-control';
import {
	container,
	DI,
	IContext
} from '@airport/di';
import { TRANSACTIONAL_RECEIVER, TRANSACTIONAL_SERVER } from '@airport/terminal-map';

export class GoTransactionalReceiver {

}

DI.set(TRANSACTIONAL_RECEIVER, GoTransactionalReceiver);

export function injectTransactionalConnector(): void {
	// console.log('Injecting TransactionalConnector')
}
