import { IIsolateMessageOut } from '@airport/apron'
import { ILocalAPIRequest } from '@airport/aviation-communication'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { loadTower } from '@airport/tower'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

window.addEventListener("message", event => {
    const message: IIsolateMessageOut<any> | ILocalAPIRequest = event.data
    processMessage(message, event.origin).then()
})

async function processMessage(
    message: IIsolateMessageOut<any> | ILocalAPIRequest,
    origin: string
): Promise<void> {
    const container = DEPENDENCY_INJECTION.db(message.transactionId)
    const transactionalConnector: IIframeTransactionalConnector = await container.get(TRANSACTIONAL_CONNECTOR) as any

    await transactionalConnector.processMessage(message, origin)

    if (message.category === 'FromClientRedirected') {
        DEPENDENCY_INJECTION.remove(container)
    } else {
        console.error('Unexpected message.category: ' + message.category);
    }
}

async function loadTransactionalConnector() {
    const container = DEPENDENCY_INJECTION.db()
    const transactionalConnector: IIframeTransactionalConnector = await container.get(TRANSACTIONAL_CONNECTOR) as any

    await transactionalConnector.initializeConnection()

    console.log('Iframe loaded')
}

export function loadIframe(
    applicationName: string
) {
    loadTower(applicationName)
    loadTransactionalConnector().then()
}
