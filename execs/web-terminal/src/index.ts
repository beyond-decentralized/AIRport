import {
    injectTransactionalConnector,
    injectTransactionalServer
} from '@airport/terminal'
import {
    injectAirportDatabase,
    injectEntityStateManager
} from '@airport/tower'

export * from './DomainRetriever'
export * from './WebApplicationInitializer'
export * from './WebTransactionalReceiver'

export function injectTransactionalReceiver(): void {
    console.log('Injecting TransactionalReceiver')
    // injectMovingWalkway()
    injectTransactionalConnector()
    injectAirportDatabase()
    injectTransactionalServer()
    injectEntityStateManager()
}
