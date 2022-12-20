import {
    AIRPORT_DATABASE,
    APPLICATION_UTILS,
    FIELD_UTILS,
    Q_METADATA_UTILS,
    RELATION_MANAGER,
    REPOSITORY_LOADER,
    UTILS
} from '@airport/air-traffic-control'
import { ApplicationDao, DomainDao } from '@airport/airspace/dist/app/bundle'
import { QUERY_PARAMETER_DESERIALIZER, QUERY_RESULTS_SERIALIZER } from '@airport/arrivals-n-departures'
import { TERMINAL_SESSION_MANAGER } from '@airport/terminal-map'
import { lib } from '@airport/direction-indicator'
import {
    ACTIVE_QUERIES,
    OBSERVABLE_QUERY_ADAPTER
} from '@airport/flight-number'
import { ID_GENERATOR } from '@airport/fuel-hydrant-system'
import {
    DB_APPLICATION_UTILS,
    ENTITY_STATE_MANAGER,
    SEQUENCE_GENERATOR,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import {
    SynchronizationAdapterLoader, SynchronizationInManager, SynchronizationOutManager
} from '@airport/ground-transport'
import {
    ActorDao, OperationHistoryDuo, RecordHistoryDuo, RepositoryDao, RepositoryNestingDao, RepositoryTransactionHistoryDao, RepositoryTransactionHistoryDuo, REPOSITORY_MANAGER, TransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
import { SessionStateApi } from '@airport/session-state/dist/app/bundle'
import { QUERY_FACADE } from '@airport/tarmaq-dao'
import { QUERY_UTILS } from '@airport/tarmaq-query'
import {
    APPLICATION_INITIALIZER,
    STORE_DRIVER,
    TERMINAL_STORE,
    TRANSACTIONAL_RECEIVER,
    TRANSACTIONAL_SERVER,
    TRANSACTION_MANAGER,
    USER_STORE
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

const terminal = lib('terminal')

REPOSITORY_LOADER.setClass(RepositoryLoader)
TRANSACTIONAL_CONNECTOR.setClass(InternalTransactionalConnector)
TRANSACTIONAL_CONNECTOR.setDependencies({
    terminalStore: TERMINAL_STORE,
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
    applicationUtils: APPLICATION_UTILS,
    fieldUtils: FIELD_UTILS,
    queryUtils: QUERY_UTILS,
    relationManager: RELATION_MANAGER
})

terminal.setDependencies(TransactionalReceiver as any, {
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER
})

terminal.setDependencies(DatabaseManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationDao: ApplicationDao,
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    internalRecordManager: InternalRecordManager,
    storeDriver: STORE_DRIVER,
    transactionalServer: TRANSACTIONAL_SERVER,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(DeleteManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    historyManager: HistoryManager,
    operationHistoryDuo: OperationHistoryDuo,
    recordHistoryDuo: RecordHistoryDuo,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
    utils: UTILS
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
    historyManager: InsertManager,
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
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(OnlineManager, {
    repositoryDao: RepositoryDao,
    repositoryManager: RepositoryManager,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(OperationManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    cascadeGraphVerifier: CascadeGraphVerifier,
    deleteManager: DeleteManager,
    dependencyGraphResolver: DependencyGraphResolver,
    entityGraphReconstructor: EntityGraphReconstructor,
    entityStateManager: ENTITY_STATE_MANAGER,
    insertManager: InsertManager,
    qMetadataUtils: Q_METADATA_UTILS,
    queryFacade: QUERY_FACADE,
    repositoryManager: RepositoryManager,
    structuralEntityValidator: StructuralEntityValidator,
    updateManager: UpdateManager,
    utils: UTILS
})

terminal.setDependencies(QueryManager, {
    actorDao: ActorDao,
    airportDatabase: AIRPORT_DATABASE,
    observableQueryAdapter: OBSERVABLE_QUERY_ADAPTER,
    repositoryDao: RepositoryDao,
    repositoryLoader: REPOSITORY_LOADER,
    storeDriver: STORE_DRIVER
})

REPOSITORY_LOADER.setDependencies({
    repositoryDao: RepositoryDao,
    synchronizationAdapterLoader: SynchronizationAdapterLoader,
    synchronizationInManager: SynchronizationInManager
})

REPOSITORY_MANAGER.setClass(RepositoryManager)
REPOSITORY_MANAGER.setDependencies({
    repositoryDao: RepositoryDao,
    repositoryNestingDao: RepositoryNestingDao,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TERMINAL_STORE
})

terminal.setDependencies(StructuralEntityValidator, {
    applicationUtils: APPLICATION_UTILS,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
})

TERMINAL_SESSION_MANAGER.setClass(TerminalSessionManager)
TERMINAL_SESSION_MANAGER.setDependencies({
    sessionStateApi: SessionStateApi,
    terminalStore: TERMINAL_STORE,
    userAccountManager: UserAccountManager,
    userStore: USER_STORE
})

TRANSACTION_MANAGER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    idGenerator: ID_GENERATOR,
    storeDriver: STORE_DRIVER,
    synchronizationOutManager: SynchronizationOutManager,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TERMINAL_STORE,
    transactionHistoryDuo: TransactionHistoryDuo,
})

TRANSACTIONAL_RECEIVER.setDependencies({
    actorDao: ActorDao,
    applicationDao: ApplicationDao,
    databaseManager: DatabaseManager,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    internalRecordManager: InternalRecordManager,
    localApiServer: LOCAL_API_SERVER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER,
    transactionalServer: TRANSACTIONAL_SERVER
})

TRANSACTIONAL_SERVER.setDependencies({
    deleteManager: DeleteManager,
    insertManager: InsertManager,
    operationManager: OperationManager,
    queryManager: QueryManager,
    repositoryManager: RepositoryManager,
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER,
    updateManager: UpdateManager
})


terminal.setDependencies(UpdateManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    fieldUtils: FIELD_UTILS,
    historyManager: HistoryManager,
    operationHistoryDuo: OperationHistoryDuo,
    queryFacade: QUERY_FACADE,
    queryUtils: QUERY_UTILS,
    recordHistoryDuo: RecordHistoryDuo,
    relationManager: RELATION_MANAGER,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
})
