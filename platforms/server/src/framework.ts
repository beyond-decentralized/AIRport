import { loadAirTrafficControl } from '@airport/air-traffic-control'
import { startDb } from '@airport/sqljs'
import { injectTransactionalConnector, injectTransactionalServer } from '@airport/terminal'
import { injectAirportDatabase, injectEntityStateManager } from '@airport/tower'
import { loadSessionStateApi } from '@airport/session-state/dist/app/bundle'

console.log('Injecting Server Source')
loadAirTrafficControl()
injectTransactionalConnector()
injectAirportDatabase()
injectTransactionalServer()
injectEntityStateManager()
loadSessionStateApi()

export async function initServer() {
    await startDb('AIRport-prerelease')
}