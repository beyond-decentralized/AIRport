import { loadAutopilot } from '@airport/autopilot'
import { Message_Type, IApiCallRequestMessage, IMessage } from '@airport/aviation-communication'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { loadTower } from '@airport/tower'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

window.addEventListener("message", event => {
    const message: IMessage | IApiCallRequestMessage = event.data
    processMessage(message, event.origin).then()
})

async function processMessage(
    message: IMessage | IApiCallRequestMessage,
    origin: string
): Promise<void> {
    let containerId = message.transactionId
    if (!containerId) {
        containerId = message.subscriptionId
    }
    if (!containerId) {
        switch (message.type) {
            case Message_Type.APP_INITIALIZING:
            case Message_Type.APP_INITIALIZED:
            case Message_Type.RETRIEVE_DOMAIN:
            case Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME:
                break;
            default:
                console.error(`No transactionId or subscriptionId provided for ${message.type}`)
                return
        }
    }

    const container = DEPENDENCY_INJECTION.db(containerId)
    try {
        const transactionalConnector: IIframeTransactionalConnector = await container.get(TRANSACTIONAL_CONNECTOR) as any
        await transactionalConnector.processMessage(
            message as IApiCallRequestMessage, origin)
    } finally {
        DEPENDENCY_INJECTION.remove(container)
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
    loadAutopilot()
    loadTower(applicationName)
    loadTransactionalConnector().then()
}
