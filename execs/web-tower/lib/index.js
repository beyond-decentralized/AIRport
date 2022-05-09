import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { loadTower } from '@airport/tower';
export * from './DomainRetriever';
export * from './IFrameApplicationInitializer';
export * from './IFrameApplicationLocator';
export * from './IFrameInterAppApiClient';
export * from './IFrameTransactionalConnector';
export * from './tokens';
window.addEventListener("message", event => {
    const message = event.data;
    processMessage(message, event.origin).then();
});
async function processMessage(message, origin) {
    const container = DEPENDENCY_INJECTION.db(message.transactionId);
    const transactionalConnector = await container.get(TRANSACTIONAL_CONNECTOR);
    await transactionalConnector.processMessage(message, origin);
    if (message.category === 'FromClientRedirected') {
        DEPENDENCY_INJECTION.remove(container);
    }
}
async function loadTransactionalConnector() {
    const container = DEPENDENCY_INJECTION.db();
    const transactionalConnector = await container.get(TRANSACTIONAL_CONNECTOR);
    await transactionalConnector.initializeConnection();
    console.log('Iframe loaded');
}
export function loadIframe(applicationName) {
    loadTower(applicationName);
    loadTransactionalConnector().then();
}
//# sourceMappingURL=index.js.map