
import { IOC } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { loadIframeTransactionalConnector } from '@airport/web-tower'
import { loadApplicationInitializer } from '@airport/functionality-demo-schema/lib/server'

loadIframeTransactionalConnector()
loadApplicationInitializer()

export async function initAIRportApp() {
    await IOC.get(TRANSACTIONAL_CONNECTOR)
}