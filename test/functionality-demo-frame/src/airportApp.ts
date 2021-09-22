
import { IOC } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { loadIframeTransactionalConnector } from '@airport/web-tower'

loadIframeTransactionalConnector();

export async function initAIRportApp() {
    await IOC.get(TRANSACTIONAL_CONNECTOR)
}