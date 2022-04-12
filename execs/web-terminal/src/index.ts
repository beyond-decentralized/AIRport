import {
    injectTransactionalConnector,
    injectTransactionalServer
} from '@airport/terminal'
import {
    injectAirportDatabase,
    injectEntityStateManager
} from '@airport/tower'
import { injectWebReceiver } from './WebMessageReceiver'

export * from './DomainRetriever'
export * from './WebApplicationInitializer'
export * from './WebTransactionalReceiver'
export * from './WebMessageReceiver'

export function injectTransactionalReceiver(): void {
    console.log('Injecting TransactionalReceiver')
    // injectMovingWalkway()
    injectTransactionalConnector()
    injectAirportDatabase()
    injectTransactionalServer()
    injectEntityStateManager()
    injectWebReceiver()
}
