import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { lib } from '@airport/direction-indicator';
import { DB_APPLICATION_UTILS, SEQUENCE_GENERATOR, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TerminalStore } from './store/TerminalStore';
import { TerminalState } from './store/TerminalState';
import { SELECTOR_MANAGER } from '@airport/apron';
import { UserState } from './store/user/UserState';
import { UserStore } from './store/user/UserStore';
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
    interface: 'IStoreDriver',
    token: 'STORE_DRIVER'
});
export const TERMINAL_STATE = terminalMap.token({
    class: TerminalState,
    interface: 'ITerminalStateContainer',
    token: 'TERMINAL_STATE'
});
export const TERMINAL_STORE = terminalMap.token({
    class: TerminalStore,
    interface: 'ITerminalStore',
    token: 'TERMINAL_STORE'
});
export const TRANSACTION_MANAGER = terminalMap.token({
    class: null,
    interface: 'ITransactionManager',
    token: 'TRANSACTION_MANAGER'
});
export const TRANSACTIONAL_RECEIVER = terminalMap.token({
    class: null,
    interface: 'ITransactionalReceiver',
    token: 'TRANSACTIONAL_RECEIVER'
});
export const TRANSACTIONAL_SERVER = terminalMap.token({
    class: null,
    interface: 'ITransactionalServer',
    token: 'TRANSACTIONAL_SERVER'
});
export const USER_STATE = terminalMap.token({
    class: UserState,
    interface: 'IUserStateContainer',
    token: 'USER_STATE'
});
export const USER_STORE = terminalMap.token({
    class: UserStore,
    interface: 'IUserStore',
    token: 'USER_STORE'
});
APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE
});
DOMAIN_RETRIEVER.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
TERMINAL_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER,
    terminalState: TERMINAL_STATE
});
TRANSACTION_MANAGER.setDependencies({
    storeDriver: STORE_DRIVER,
    terminalStore: TERMINAL_STORE
});
TRANSACTIONAL_RECEIVER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
});
TRANSACTIONAL_SERVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER
});
USER_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER,
    userState: USER_STATE
});
//# sourceMappingURL=tokens.js.map