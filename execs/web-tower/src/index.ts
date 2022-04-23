import { INTER_APP_API_CLIENT, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { APPLICATION_LOCATOR } from '@airport/landing'
import { DOMAIN_RETRIEVER } from '@airport/terminal-map'

export * from './DomainRetriever'
export * from './IFrameApplicationInitializer'
export * from './IFrameApplicationLocator'
export * from './IFrameInterAppApiClient'
export * from './IFrameTransactionalConnector'

export function loadIframe() {
    console.log('Iframe loaded')
}

DOMAIN_RETRIEVER.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})

APPLICATION_LOCATOR.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})

INTER_APP_API_CLIENT.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
