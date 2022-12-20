import { API_CLIENT } from '@airport/direction-indicator'
import { DbApplicationUtils, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { APPLICATION_LOCATOR } from "@airport/landing";
import {
    ApplicationStore,
    APPLICATION_LOADER,
    LOCAL_API_SERVER
} from "@airport/apron";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER, TerminalStore } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { IFrameApplicationInitializer } from "./IFrameApplicationInitializer";
import { IFrameApplicationLocator } from "./IFrameApplicationLocator";
import { IFrameInterAppPIClient } from "./IFrameInterAppApiClient";
import { IframeTransactionalConnector } from "./IFrameTransactionalConnector";

DOMAIN_RETRIEVER.setClass(DomainRetriever)
APPLICATION_INITIALIZER.setClass(IFrameApplicationInitializer)
APPLICATION_LOCATOR.setClass(IFrameApplicationLocator)
API_CLIENT.setClass(IFrameInterAppPIClient)
APPLICATION_LOCATOR.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
API_CLIENT.setDependencies({
    operationSerializer: globalThis.OPERATION_SERIALIZER,
    queryResultsDeserializer: globalThis.QUERY_RESULTS_DESERIALIZER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
TRANSACTIONAL_CONNECTOR.setClass(IframeTransactionalConnector)
TRANSACTIONAL_CONNECTOR.setDependencies({
    applicationLoader: APPLICATION_LOADER,
    applicationStore: ApplicationStore,
    dbApplicationUtils: DbApplicationUtils,
    localApiServer: LOCAL_API_SERVER,
    terminalStore: TerminalStore
})