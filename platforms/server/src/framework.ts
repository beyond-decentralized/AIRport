import { loadAirTrafficControl } from '@airport/air-traffic-control'
import { startDb } from '@airport/sqljs'
import { injectTransactionalConnector, injectTransactionalServer } from '@airport/terminal'
import { injectAirportDatabase, injectEntityStateManager } from '@airport/tower'

console.log('Injecting Server Source')
loadAirTrafficControl()
injectTransactionalConnector()
injectAirportDatabase()
injectTransactionalServer()
injectEntityStateManager()

export async function initServer() {
    await startDb('AIRport-prerelease')
}