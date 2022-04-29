import { INTER_APP_API_CLIENT, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { APPLICATION_LOCATOR } from '@airport/landing';
export * from './DomainRetriever';
export * from './IFrameApplicationInitializer';
export * from './IFrameApplicationLocator';
export * from './IFrameInterAppApiClient';
export * from './IFrameTransactionalConnector';
export * from './tokens';
export function loadIframe() {
    console.log('Iframe loaded');
}
APPLICATION_LOCATOR.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
INTER_APP_API_CLIENT.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
//# sourceMappingURL=index.js.map