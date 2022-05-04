import { INTER_APP_API_CLIENT, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { APPLICATION_LOCATOR } from '@airport/landing'

export * from './DomainRetriever'
export * from './IFrameApplicationInitializer'
export * from './IFrameApplicationLocator'
export * from './IFrameInterAppApiClient'
export * from './IFrameTransactionalConnector'
export * from './tokens'



// window.addEventListener("message", event => {
    
// })

export function loadIframe() {
    console.log('Iframe loaded')
}