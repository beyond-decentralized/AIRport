import { AIRPORT_DATABASE } from '@airport/air-traffic-control'
import { lib } from '@airport/direction-indicator'
import {
    DB_APPLICATION_UTILS,
    SEQUENCE_GENERATOR,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import { ITransactionManager } from './orchestration/TransactionManager'
import { ITerminalStore, TerminalStore } from './store/TerminalStore'
import { ITransactionalServer } from './transaction/ITransactionalServer'
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver'
import { IDomainRetriever } from './store/DomainRetriever'
import { IStoreDriver } from './core/data/StoreDriver'
import { ITerminalStateContainer, TerminalState } from './store/TerminalState'
import { APPLICATION_LOADER, SELECTOR_MANAGER } from '@airport/apron'
import { IApplicationInitializer } from './core/ApplicationInitializer'
import { IUserStateContainer, UserState } from './store/user/UserState'
import { IUserStore, UserStore } from './store/user/UserStore'
import { ITerminalSessionManager } from './core/ITerminalSessionManager'
import { AbstractApplicationLoader } from './AbstractApplicationLoader'
import { API_REGISTRY } from '@airport/check-in'

const terminalMap = lib('terminal-map')

export const APPLICATION_INITIALIZER = terminalMap.token<IApplicationInitializer>({
    class: null,
    interface: 'IApplicationInitializer',
    token: 'APPLICATION_INITIALIZER'
})
export const DOMAIN_RETRIEVER = terminalMap.token<IDomainRetriever>({
    class: null,
    interface: 'IDomainRetriever',
    token: 'DOMAIN_RETRIEVER'
})
export const STORE_DRIVER = terminalMap.token<IStoreDriver>({
    class: null,
    interface: 'IStoreDriver',
    token: 'STORE_DRIVER'
});
export const TERMINAL_SESSION_MANAGER = terminalMap.token<ITerminalSessionManager>({
    class: null,
    interface: 'ITerminalSessionManager',
    token: 'TERMINAL_SESSION_MANAGER'
})
export const TERMINAL_STATE = terminalMap.token<ITerminalStateContainer>({
    class: TerminalState,
    interface: 'ITerminalStateContainer',
    token: 'TERMINAL_STATE'
})
export const TERMINAL_STORE = terminalMap.token<ITerminalStore>({
    class: TerminalStore,
    interface: 'ITerminalStore',
    token: 'TERMINAL_STORE'
})
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>({
    class: null,
    interface: 'ITransactionManager',
    token: 'TRANSACTION_MANAGER'
})
export const TRANSACTIONAL_RECEIVER = terminalMap.token<ITransactionalReceiver>({
    class: null,
    interface: 'ITransactionalReceiver',
    token: 'TRANSACTIONAL_RECEIVER'
})
export const TRANSACTIONAL_SERVER = terminalMap.token<ITransactionalServer>({
    class: null,
    interface: 'ITransactionalServer',
    token: 'TRANSACTIONAL_SERVER'
})
export const USER_STATE = terminalMap.token<IUserStateContainer>({
    class: UserState,
    interface: 'IUserStateContainer',
    token: 'USER_STATE'
})
export const USER_STORE = terminalMap.token<IUserStore>({
    class: UserStore,
    interface: 'IUserStore',
    token: 'USER_STORE'
})

APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TERMINAL_STORE
})

DOMAIN_RETRIEVER.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})

TERMINAL_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER,
    terminalState: TERMINAL_STATE
})

TRANSACTION_MANAGER.setDependencies({
    storeDriver: STORE_DRIVER,
    terminalStore: TERMINAL_STORE
})

TRANSACTIONAL_RECEIVER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
})

TRANSACTIONAL_SERVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER
})

USER_STORE.setDependencies({
    selectorManager: SELECTOR_MANAGER,
    userState: USER_STATE
})

APPLICATION_LOADER.setClass(AbstractApplicationLoader)
APPLICATION_LOADER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    terminalStore: TERMINAL_STORE,
    apiRegistry: API_REGISTRY,
})

globalThis.APPLICATION_INITIALIZER = APPLICATION_INITIALIZER
globalThis.DOMAIN_RETRIEVER = DOMAIN_RETRIEVER
globalThis.STORE_DRIVER = STORE_DRIVER
globalThis.TERMINAL_SESSION_MANAGER = TERMINAL_SESSION_MANAGER
globalThis.TERMINAL_STATE = TERMINAL_STATE
globalThis.TERMINAL_STORE = TERMINAL_STORE
globalThis.TRANSACTION_MANAGER = TRANSACTION_MANAGER
globalThis.TRANSACTIONAL_RECEIVER = TRANSACTIONAL_RECEIVER
globalThis.TRANSACTIONAL_SERVER = TRANSACTIONAL_SERVER
globalThis.USER_STATE = USER_STATE
globalThis.USER_STORE = USER_STORE
