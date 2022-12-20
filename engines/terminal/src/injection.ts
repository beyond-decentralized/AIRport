import {
    AIRPORT_DATABASE,
    ApplicationUtils,
    FieldUtils,
    QMetadataUtils,
    RelationManager,
    REPOSITORY_LOADER,
    Utils
} from '@airport/air-traffic-control'
import { ApplicationDao, DomainDao } from '@airport/airspace/dist/app/bundle'
import { QUERY_PARAMETER_DESERIALIZER, QUERY_RESULTS_SERIALIZER } from '@airport/arrivals-n-departures'
import { TerminalStore, TERMINAL_SESSION_MANAGER, UserStore } from '@airport/terminal-map'
import { lib } from '@airport/direction-indicator'
import {
    DbApplicationUtils,
    ENTITY_STATE_MANAGER,
    SEQUENCE_GENERATOR,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import {
    SynchronizationAdapterLoader,
    SynchronizationInManager,
    SynchronizationOutManager
} from '@airport/ground-transport'
import {
    ActorDao,
    OperationHistoryDuo,
    RecordHistoryDuo,
    RepositoryDao,
    RepositoryNestingDao,
    RepositoryTransactionHistoryDao,
    RepositoryTransactionHistoryDuo,
    REPOSITORY_MANAGER,
    TransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
import { SessionStateApi } from '@airport/session-state/dist/app/bundle'
import { QUERY_FACADE } from '@airport/tarmaq-dao'
import { QUERY_UTILS } from '@airport/tarmaq-query'
import {
    APPLICATION_INITIALIZER,
    STORE_DRIVER,
    TRANSACTIONAL_RECEIVER,
    TRANSACTIONAL_SERVER,
    TRANSACTION_MANAGER
} from '@airport/terminal-map'
import { RepositoryLoader } from './core/repository/RepositoryLoader'
import { TerminalSessionManager } from './core/TerminalSessionManager'
import { InternalRecordManager } from './data/InternalRecordManager'
import { InternalTransactionalConnector } from './net/InternalTransactionalConnector'
import { OnlineManager } from './net/OnlineManager'
import { TransactionalReceiver } from './net/TransactionalReceiver'
import { TransactionalServer } from './net/TransactionalServer'
import { AbstractMutationManager } from './orchestration/AbstractMutationManager'
import { DatabaseManager } from './orchestration/DatabaseManager'
import { DeleteManager } from './orchestration/DeleteManager'
import { HistoryManager } from './orchestration/HistoryManager'
import { InsertManager } from './orchestration/InsertManager'
import { QueryManager } from './orchestration/QueryManager'
import { TransactionManager } from './orchestration/TransactionManager'
import { UpdateManager } from './orchestration/UpdateManager'
import { CascadeGraphVerifier } from './processing/CascadeGraphVerifier'
import { DependencyGraphResolver } from './processing/DependencyGraphResolver'
import { EntityGraphReconstructor } from './processing/EntityGraphReconstructor'
import { OperationManager } from './processing/OperationManager'
import { StructuralEntityValidator } from './processing/StructuralEntityValidator'
import { QueryParameterDeserializer } from './serialize/QueryParameterDeserializer'
import { QueryResultsSerializer } from './serialize/QueryResultsSerializer'
import { RepositoryManager } from './core/repository/RepositoryManager'
import { UserAccountManager } from '@airport/travel-document-checkpoint/dist/app/bundle'
import { LOCAL_API_SERVER } from '@airport/apron'
import { IdGenerator } from '@airport/fuel-hydrant-system'
import { ActiveQueries, ObservableQueryAdapter } from '@airport/flight-number'

const terminal = lib('terminal')

REPOSITORY_LOADER.setClass(RepositoryLoader)
TRANSACTIONAL_CONNECTOR.setClass(InternalTransactionalConnector)
TRANSACTIONAL_CONNECTOR.setDependencies({
    terminalStore: TerminalStore,
    transactionalServer: TRANSACTIONAL_SERVER
})
TRANSACTIONAL_SERVER.setClass(TransactionalServer)
TRANSACTION_MANAGER.setClass(TransactionManager)
QUERY_PARAMETER_DESERIALIZER.setClass(QueryParameterDeserializer)
QUERY_RESULTS_SERIALIZER.setClass(QueryResultsSerializer)

terminal.register(
    AbstractMutationManager, TransactionalReceiver as any, CascadeGraphVerifier,
    DatabaseManager, DeleteManager, DependencyGraphResolver,
    EntityGraphReconstructor, HistoryManager, InsertManager,
    InternalRecordManager, OnlineManager, OperationManager,
    QueryManager, StructuralEntityValidator, UpdateManager
)

terminal.setDependencies(AbstractMutationManager, {
    applicationUtils: ApplicationUtils,
    fieldUtils: FieldUtils,
    queryUtils: QUERY_UTILS,
    relationManager: RelationManager
})

terminal.setDependencies(TransactionalReceiver as any, {
    terminalStore: TerminalStore,
    transactionalServer: TRANSACTIONAL_SERVER
})

terminal.setDependencies(DatabaseManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationDao: ApplicationDao,
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DbApplicationUtils,
    internalRecordManager: InternalRecordManager,
    storeDriver: STORE_DRIVER,
    transactionalServer: TRANSACTIONAL_SERVER,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(DeleteManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    historyManager: HistoryManager,
    operationHistoryDuo: OperationHistoryDuo,
    recordHistoryDuo: RecordHistoryDuo,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
    utils: Utils
})

terminal.setDependencies(DependencyGraphResolver, {
    entityStateManager: ENTITY_STATE_MANAGER
})

terminal.setDependencies(EntityGraphReconstructor, {
    entityStateManager: ENTITY_STATE_MANAGER
})

terminal.setDependencies(HistoryManager, {
    transactionHistoryDuo: TransactionHistoryDuo,
})

terminal.setDependencies(InsertManager, {
    airportDatabase: AIRPORT_DATABASE,
    historyManager: HistoryManager,
    operationHistoryDuo: OperationHistoryDuo,
    recordHistoryDuo: RecordHistoryDuo,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR
})

terminal.setDependencies(InternalRecordManager, {
    actorDao: ActorDao,
    applicationDao: ApplicationDao,
    domainDao: DomainDao,
    entityStateManager: ENTITY_STATE_MANAGER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER
})

REPOSITORY_MANAGER.setClass(RepositoryManager)
REPOSITORY_MANAGER.setDependencies({
    repositoryDao: RepositoryDao,
    repositoryNestingDao: RepositoryNestingDao,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore
})

terminal.setDependencies(OnlineManager, {
    repositoryDao: RepositoryDao,
    repositoryManager: RepositoryManager,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(OperationManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    cascadeGraphVerifier: CascadeGraphVerifier,
    deleteManager: DeleteManager,
    dependencyGraphResolver: DependencyGraphResolver,
    entityGraphReconstructor: EntityGraphReconstructor,
    entityStateManager: ENTITY_STATE_MANAGER,
    insertManager: InsertManager,
    qMetadataUtils: QMetadataUtils,
    queryFacade: QUERY_FACADE,
    repositoryManager: RepositoryManager,
    structuralEntityValidator: StructuralEntityValidator,
    updateManager: UpdateManager,
    utils: Utils
})

terminal.setDependencies(QueryManager, {
    actorDao: ActorDao,
    airportDatabase: AIRPORT_DATABASE,
    observableQueryAdapter: ObservableQueryAdapter,
    repositoryDao: RepositoryDao,
    repositoryLoader: REPOSITORY_LOADER,
    storeDriver: STORE_DRIVER
})

REPOSITORY_LOADER.setDependencies({
    repositoryDao: RepositoryDao,
    synchronizationAdapterLoader: SynchronizationAdapterLoader,
    synchronizationInManager: SynchronizationInManager
})

terminal.setDependencies(StructuralEntityValidator, {
    applicationUtils: ApplicationUtils,
    dbApplicationUtils: DbApplicationUtils,
    entityStateManager: ENTITY_STATE_MANAGER,
})

TERMINAL_SESSION_MANAGER.setClass(TerminalSessionManager)
TERMINAL_SESSION_MANAGER.setDependencies({
    sessionStateApi: SessionStateApi,
    terminalStore: TerminalStore,
    userAccountManager: UserAccountManager,
    userStore: UserStore
})

TRANSACTION_MANAGER.setDependencies({
    activeQueries: ActiveQueries,
    idGenerator: IdGenerator,
    storeDriver: STORE_DRIVER,
    synchronizationOutManager: SynchronizationOutManager,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionHistoryDuo: TransactionHistoryDuo,
})

TRANSACTIONAL_RECEIVER.setDependencies({
    actorDao: ActorDao,
    applicationDao: ApplicationDao,
    databaseManager: DatabaseManager,
    dbApplicationUtils: DbApplicationUtils,
    internalRecordManager: InternalRecordManager,
    localApiServer: LOCAL_API_SERVER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER,
    transactionalServer: TRANSACTIONAL_SERVER
})

TRANSACTIONAL_SERVER.setDependencies({
    deleteManager: DeleteManager,
    insertManager: InsertManager,
    operationManager: OperationManager,
    queryManager: QueryManager,
    repositoryManager: RepositoryManager,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER,
    updateManager: UpdateManager
})

terminal.setDependencies(UpdateManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: ApplicationUtils,
    fieldUtils: FieldUtils,
    historyManager: HistoryManager,
    operationHistoryDuo: OperationHistoryDuo,
    queryFacade: QUERY_FACADE,
    queryUtils: QUERY_UTILS,
    recordHistoryDuo: RecordHistoryDuo,
    relationManager: RelationManager,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
})
