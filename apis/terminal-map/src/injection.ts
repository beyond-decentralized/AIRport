import { AIRPORT_DATABASE } from '@airport/air-traffic-control'
import { lib } from '@airport/direction-indicator'
import {
    AppTrackerUtils,
    DatastructureUtils,
    DbApplicationUtils,
    SEQUENCE_GENERATOR,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import { ITransactionManager } from './orchestration/TransactionManager'
import { TerminalStore } from './store/TerminalStore'
import { ITransactionalServer } from './transaction/ITransactionalServer'
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver'
import { IDomainRetriever } from './store/DomainRetriever'
import { IStoreDriver } from './core/data/StoreDriver'
import { TerminalState } from './store/TerminalState'
import { APPLICATION_LOADER, SelectorManager } from '@airport/apron'
import { IApplicationInitializer } from './core/ApplicationInitializer'
import { UserState } from './store/user/UserState'
import { UserStore } from './store/user/UserStore'
import { ITerminalSessionManager } from './core/ITerminalSessionManager'
import { AbstractApplicationLoader } from './AbstractApplicationLoader'
import { API_REGISTRY } from '@airport/check-in'

const terminalMap = lib('terminal-map')

terminalMap.register(TerminalState, TerminalStore, UserState, UserStore)

export const APPLICATION_INITIALIZER = terminalMap.token<IApplicationInitializer>('ApplicationInitializer')
export const DOMAIN_RETRIEVER = terminalMap.token<IDomainRetriever>('DomainRetriever')
export const STORE_DRIVER = terminalMap.token<IStoreDriver>('StoreDriver');
export const TERMINAL_SESSION_MANAGER = terminalMap.token<ITerminalSessionManager>('TerminalSessionManager')
export const TRANSACTION_MANAGER = terminalMap.token<ITransactionManager>('TransactionManager')
export const TRANSACTIONAL_RECEIVER = terminalMap.token<ITransactionalReceiver>('TransactionalReceiver')
export const TRANSACTIONAL_SERVER = terminalMap.token<ITransactionalServer>('TransactionalServer')

APPLICATION_INITIALIZER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalStore: TerminalStore
})

DOMAIN_RETRIEVER.setDependencies({
    transactionalConnector: TRANSACTIONAL_CONNECTOR
})

terminalMap.setDependencies(TerminalState, {
    appTrackerUtils: AppTrackerUtils
})

terminalMap.setDependencies(TerminalStore, {
    datastructureUtils: DatastructureUtils,
    selectorManager: SelectorManager,
    terminalState: TerminalState
})

TRANSACTION_MANAGER.setDependencies({
    storeDriver: STORE_DRIVER,
    terminalStore: TerminalStore
})

TRANSACTIONAL_RECEIVER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DbApplicationUtils,
})

TRANSACTIONAL_SERVER.setDependencies({
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER
})

terminalMap.setDependencies(UserStore, {
    selectorManager: SelectorManager,
    userState: UserState
})

APPLICATION_LOADER.setClass(AbstractApplicationLoader)
APPLICATION_LOADER.setDependencies({
    applicationInitializer: APPLICATION_INITIALIZER,
    terminalStore: TerminalStore,
    apiRegistry: API_REGISTRY,
})
