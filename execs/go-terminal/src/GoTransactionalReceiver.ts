import { IQueryContext } from '@airport/air-control';
import {
	container,
	DEPENDENCY_INJECTION,
	IContext
} from '@airport/direction-indicator';
import { TRANSACTIONAL_RECEIVER, TRANSACTIONAL_SERVER } from '@airport/terminal-map';

export class GoTransactionalReceiver {

}

DEPENDENCY_INJECTION.set(TRANSACTIONAL_RECEIVER, GoTransactionalReceiver);

export function injectTransactionalConnector(): void {
	// console.log('Injecting TransactionalConnector')
}
