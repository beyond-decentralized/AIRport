import { DEPENDENCY_INJECTION } from "@airport/direction-indicator";
import { INTER_APP_API_CLIENT, TRANSACTIONAL_CONNECTOR } from "@airport/ground-control";
import { APPLICATION_LOCATOR } from "@airport/landing";
import { OPERATION_SERIALIZER, QUERY_RESULTS_DESERIALIZER } from "@airport/pressurization";
import {
    APPLICATION_LOADER,
    LOCAL_API_SERVER
} from "@airport/security-check";
import { APPLICATION_INITIALIZER, DOMAIN_RETRIEVER } from "@airport/terminal-map";
import { DomainRetriever } from "./DomainRetriever";
import { IFrameApplicationInitializer } from "./IFrameApplicationInitializer";
import { IFrameApplicationLocator } from "./IFrameApplicationLocator";
import { IFrameInterAppPIClient } from "./IFrameInterAppApiClient";
import { IframeTransactionalConnector } from "./IFrameTransactionalConnector";

DEPENDENCY_INJECTION.set(DOMAIN_RETRIEVER, DomainRetriever)
DEPENDENCY_INJECTION.set(APPLICATION_INITIALIZER, IFrameApplicationInitializer)
DEPENDENCY_INJECTION.set(APPLICATION_LOCATOR, IFrameApplicationLocator)
DEPENDENCY_INJECTION.set(INTER_APP_API_CLIENT, IFrameInterAppPIClient)
APPLICATION_LOCATOR.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
INTER_APP_API_CLIENT.setDependencies({
    operationSerializer: OPERATION_SERIALIZER,
    queryResultsDeserializer: QUERY_RESULTS_DESERIALIZER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})
DEPENDENCY_INJECTION.set(TRANSACTIONAL_CONNECTOR, IframeTransactionalConnector)
TRANSACTIONAL_CONNECTOR.setDependencies({
    applicationLoader: APPLICATION_LOADER,
    localApiServer: LOCAL_API_SERVER
})