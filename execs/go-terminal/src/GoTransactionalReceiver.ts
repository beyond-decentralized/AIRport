import {
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator';
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map';

export class GoTransactionalReceiver {

}

DEPENDENCY_INJECTION.set(TRANSACTIONAL_RECEIVER, GoTransactionalReceiver);

export function injectTransactionalConnector(): void {
	// console.log('Injecting TransactionalConnector')
}
