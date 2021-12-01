
import { IOC } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { loadIframeTransactionalConnector } from '@airport/web-tower'
import { loadApplicationInitializer } from '@airport/functionality-demo-application/lib/server'
import { messages } from './store';

loadIframeTransactionalConnector()
loadApplicationInitializer()

let allMessages = []

export async function initAIRportApp() {
    const transactionalConnector = await IOC.get(TRANSACTIONAL_CONNECTOR)
    transactionalConnector.onMessage((message) => {
        allMessages.push(message)
        messages.set(allMessages)
    })
}