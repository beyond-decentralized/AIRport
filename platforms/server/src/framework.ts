import { loadAirTrafficControl } from '@airport/air-traffic-control'
import { startDb } from '@airport/sqljs'
import { injectTransactionalConnector, injectTransactionalServer } from '@airport/terminal'
import { injectAirportDatabase, injectEntityStateManager } from '@airport/tower'
import { loadSessionStateApi } from '@airport/session-state/dist/app/bundle'
import { IOC } from '@airport/direction-indicator'
import { injectWebReceiver, WebMessageGateway } from '@airport/web-terminal'

console.log('Injecting Server Source')
loadAirTrafficControl()
injectTransactionalConnector()
injectAirportDatabase()
injectTransactionalServer()
injectEntityStateManager()
loadSessionStateApi()

export async function initServer() {
    injectWebReceiver()
    await startDb('AIRport-prerelease')
    await IOC.get(WebMessageGateway)
}
