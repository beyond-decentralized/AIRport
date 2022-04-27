import { lib } from '@airport/direction-indicator';
import { OPERATION_CONTEXT_LOADER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { SELECTOR_MANAGER, SEQUENCE_GENERATOR } from '@airport/check-in';
import { AIRPORT_DATABASE } from '@airport/air-control';
const terminalMap = lib('terminal-map');
export const APPLICATION_INITIALIZER = terminalMap.token({
    class: null,
    interface: 'IApplicationInitializer',
    token: 'APPLICATION_INITIALIZER'
});
export const DOMAIN_RETRIEVER = terminalMap.token({
    class: null,
    interface: 'IDomainRetriever',
    token: 'DOMAIN_RETRIEVER'
});
export const STORE_DRIVER = terminalMap.token({
    class: null,
    interface: 'IDomainRetriever',
    token: 'STORE_DRIVER'
});
export const TERMINAL_STORE = terminalMap.token('TERMINAL_STORE');
export const TRANSACTION_MANAGER = terminalMap.token('TRANSACTION_MANAGER');
export const TRANSACTIONAL_RECEIVER = terminalMap.token('TRANSACTIONAL_RECEIVER');
export const TRANSACTIONAL_SERVER = terminalMap.token('TRANSACTIONAL_SERVER');
APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR
});
DOMAIN_RETRIEVER.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
TRANSACTION_MANAGER.setDependencies({
    storeDriver: STORE_DRIVER
});
TRANSACTIONAL_RECEIVER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER
});
TRANSACTIONAL_SERVER.setDependencies({
    operationContextLoader: OPERATION_CONTEXT_LOADER
});
TERMINAL_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER
});
//# sourceMappingURL=tokens.js.map