import { API_CLIENT } from '@airport/direction-indicator'
import { DbApplicationUtils, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { APPLICATION_LOCATOR } from "@airport/takeoff";
import { APPLICATION_INITIALIZER, APPLICATION_LOADER, DOMAIN_RETRIEVER, LOCAL_API_SERVER, TerminalStore } from "@airport/terminal-map";
import { ApplicationStore } from '@airport/tower';
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