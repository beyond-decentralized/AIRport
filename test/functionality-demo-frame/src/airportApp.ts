
import { IOC } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { loadIframe } from '@airport/web-tower'
import { loadApplicationInitializer } from '@airport/functionality-demo-schema/lib/app'
import { messages } from './store';

loadIframe()
loadApplicationInitializer()

let allMessages = []

export async function initAIRportApp() {
    const transactionalConnector = await IOC.get(TRANSACTIONAL_CONNECTOR)
    transactionalConnector.onMessage((message) => {
        allMessages.push(message)
        messages.set(allMessages)
    })
}