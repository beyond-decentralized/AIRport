import { DI } from '@airport/di';
import { TRANSACTIONAL_RECEIVER } from '@airport/terminal-map';
export class GoTransactionalReceiver {
}
DI.set(TRANSACTIONAL_RECEIVER, GoTransactionalReceiver);
export function injectTransactionalConnector() {
    // console.log('Injecting TransactionalConnector')
}
//# sourceMappingURL=GoTransactionalReceiver.js.map