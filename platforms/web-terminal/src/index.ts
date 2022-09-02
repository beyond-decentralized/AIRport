import { loadAirTrafficControl } from '@airport/air-traffic-control'
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
export * from './tokens'

export function injectTransactionalReceiver(): void {
    console.log('Injecting TransactionalReceiver')
    loadAirTrafficControl()
    // injectMovingWalkway()
    injectTransactionalConnector()
    injectAirportDatabase()
    injectTransactionalServer()
    injectEntityStateManager()
    injectWebReceiver()
}
