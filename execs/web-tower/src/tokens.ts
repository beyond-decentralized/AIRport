import { INTER_APP_API_CLIENT, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { APPLICATION_LOCATOR } from "@airport/landing";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import {
    APPLICATION_LOADER,
    LOCAL_API_SERVER
} from "@airport/apron";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { IFrameApplicationInitializer } from "./IFrameApplicationInitializer";
import { IFrameApplicationLocator } from "./IFrameApplicationLocator";
import { IFrameInterAppPIClient } from "./IFrameInterAppApiClient";
import { IframeTransactionalConnector } from "./IFrameTransactionalConnector";

DOMAIN_RETRIEVER.setClass(DomainRetriever)
APPLICATION_INITIALIZER.setClass(IFrameApplicationInitializer)
APPLICATION_LOCATOR.setClass(IFrameApplicationLocator)
INTER_APP_API_CLIENT.setClass(IFrameInterAppPIClient)
APPLICATION_LOCATOR.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
INTER_APP_API_CLIENT.setDependencies({
    operationSerializer: OPERATION_SERIALIZER,
    queryResultsDeserializer: QUERY_RESULTS_DESERIALIZER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
TRANSACTIONAL_CONNECTOR.setClass(IframeTransactionalConnector)
TRANSACTIONAL_CONNECTOR.setDependencies({
    applicationLoader: APPLICATION_LOADER,
    localApiServer: LOCAL_API_SERVER
})