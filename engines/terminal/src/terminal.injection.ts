import {
    AIRPORT_DATABASE,
    FieldUtils,
    QMetadataUtils,
    REPOSITORY_LOADER,
    SystemWideOperationIdUtils,
    Utils
} from '@airport/air-traffic-control'
import { DdlApplicationDao, DdlDomainDao } from '@airport/airspace/dist/app/bundle'
import { HISTORY_MANAGER, LOCAL_API_SERVER, TerminalStore, TERMINAL_SESSION_MANAGER, UserStore } from '@airport/terminal-map'
import { lib } from '@airport/direction-indicator'
import {
    APPLICATION_UTILS,
    AppTrackerUtils,
    DatastructureUtils,
    ApplicationNameUtils,
    Dictionary,
    ENTITY_STATE_MANAGER,
    QUERY_PARAMETER_DESERIALIZER,
    QUERY_RESULTS_SERIALIZER,
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
    RepositoryMemberAcceptanceDao,
    RepositoryMemberDao,
    RepositoryMemberInvitationDao,
    RepositoryTransactionHistoryDao,
    RepositoryTransactionHistoryDuo,
    REPOSITORY_MANAGER,
    TransactionHistoryDuo
} from '@airport/holding-pattern/dist/app/bundle'
// import {
//     CrossRepositoryRelationManager
// } from '@airport/layover'
import { QUERY_FACADE } from '@airport/tarmaq-dao'
import { QUERY_RELATION_MANAGER, QUERY_UTILS } from '@airport/tarmaq-query'
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
import { IdGenerator } from '@airport/fuel-hydrant-system'
import { ActiveQueries, ObservableQueryAdapter } from '@airport/flight-number'
import { RepositoryMaintenanceManager } from '@airbridge/sso'
import { CurrentValueMappingDao } from '@airport/holding-pattern/dist/app/bundle'

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
    EntityGraphReconstructor, InsertManager,
    InternalRecordManager, OnlineManager, OperationManager,
    QueryManager, StructuralEntityValidator, UpdateManager
)

terminal.setDependencies(AbstractMutationManager, {
    applicationUtils: APPLICATION_UTILS,
    fieldUtils: FieldUtils,
    queryUtils: QUERY_UTILS,
    queryRelationManager: QUERY_RELATION_MANAGER
})

terminal.setDependencies(TransactionalReceiver as any, {
    appTrackerUtils: AppTrackerUtils,
    terminalStore: TerminalStore,
    transactionalServer: TRANSACTIONAL_SERVER
})

terminal.setDependencies(DatabaseManager, {
    airportDatabase: AIRPORT_DATABASE,
    ddlApplicationDao: DdlApplicationDao,
    applicationInitializer: APPLICATION_INITIALIZER,
    applicationNameUtils: ApplicationNameUtils,
    internalRecordManager: InternalRecordManager,
    storeDriver: STORE_DRIVER,
    transactionalServer: TRANSACTIONAL_SERVER,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(DeleteManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    historyManager: HISTORY_MANAGER,
    operationHistoryDuo: OperationHistoryDuo,
    recordHistoryDuo: RecordHistoryDuo,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    systemWideOperationIdUtils: SystemWideOperationIdUtils,
    utils: Utils
})

terminal.setDependencies(DependencyGraphResolver, {
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    entityStateManager: ENTITY_STATE_MANAGER
})

terminal.setDependencies(EntityGraphReconstructor, {
    appTrackerUtils: AppTrackerUtils,
    entityStateManager: ENTITY_STATE_MANAGER
})

HISTORY_MANAGER.setClass(HistoryManager)
HISTORY_MANAGER.setDependencies({
    dataStructureUtils: DatastructureUtils,
    repositoryDao: RepositoryDao,
    repositoryMaintenanceManager: RepositoryMaintenanceManager,
    repositoryMemberDao: RepositoryMemberDao,
    sequenceGenerator: SEQUENCE_GENERATOR,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    transactionHistoryDuo: TransactionHistoryDuo,
})

terminal.setDependencies(InsertManager, {
    airportDatabase: AIRPORT_DATABASE,
    dictionary: Dictionary,
    historyManager: HISTORY_MANAGER,
    operationHistoryDuo: OperationHistoryDuo,
    recordHistoryDuo: RecordHistoryDuo,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    sequenceGenerator: SEQUENCE_GENERATOR,
    systemWideOperationIdUtils: SystemWideOperationIdUtils,
})

terminal.setDependencies(InternalRecordManager, {
    actorDao: ActorDao,
    ddlApplicationDao: DdlApplicationDao,
    ddlDomainDao: DdlDomainDao,
    entityStateManager: ENTITY_STATE_MANAGER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(OnlineManager, {
    repositoryDao: RepositoryDao,
    repositoryManager: REPOSITORY_MANAGER,
    repositoryTransactionHistoryDao: RepositoryTransactionHistoryDao,
    transactionManager: TRANSACTION_MANAGER
})

terminal.setDependencies(OperationManager, {
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    cascadeGraphVerifier: CascadeGraphVerifier,
    deleteManager: DeleteManager,
    dependencyGraphResolver: DependencyGraphResolver,
    dictionary: Dictionary,
    entityGraphReconstructor: EntityGraphReconstructor,
    entityStateManager: ENTITY_STATE_MANAGER,
    insertManager: InsertManager,
    qMetadataUtils: QMetadataUtils,
    queryFacade: QUERY_FACADE,
    repositoryManager: REPOSITORY_MANAGER,
    structuralEntityValidator: StructuralEntityValidator,
    updateManager: UpdateManager,
    utils: Utils
})

terminal.setDependencies(QueryManager, {
    actorDao: ActorDao,
    airportDatabase: AIRPORT_DATABASE,
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    observableQueryAdapter: ObservableQueryAdapter,
    repositoryDao: RepositoryDao,
    repositoryLoader: REPOSITORY_LOADER,
    storeDriver: STORE_DRIVER
})

REPOSITORY_LOADER.setDependencies({
    repositoryDao: RepositoryDao,
    synchronizationAdapterLoader: SynchronizationAdapterLoader,
    synchronizationInManager: SynchronizationInManager,
    transactionManager: TRANSACTION_MANAGER
})

REPOSITORY_MANAGER.setClass(RepositoryManager)
REPOSITORY_MANAGER.setDependencies({
    appTrackerUtils: AppTrackerUtils,
    dictionary: Dictionary,
    repositoryMaintenanceManager: RepositoryMaintenanceManager,
    repositoryDao: RepositoryDao,
    repositoryMemberDao: RepositoryMemberDao,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore
})

terminal.setDependencies(StructuralEntityValidator, {
    applicationNameUtils: ApplicationNameUtils,
    applicationUtils: APPLICATION_UTILS,
    // crossRepositoryRelationManager: CrossRepositoryRelationManager,
    dictionary: Dictionary,
    entityStateManager: ENTITY_STATE_MANAGER,
})

TERMINAL_SESSION_MANAGER.setClass(TerminalSessionManager)
TERMINAL_SESSION_MANAGER.setDependencies({
    terminalStore: TerminalStore,
    userStore: UserStore
})

TRANSACTION_MANAGER.setDependencies({
    activeQueries: ActiveQueries,
    appTrackerUtils: AppTrackerUtils,
    historyManager: HISTORY_MANAGER,
    idGenerator: IdGenerator,
    repositoryMemberAcceptanceDao: RepositoryMemberAcceptanceDao,
    repositoryMemberDao: RepositoryMemberDao,
    repositoryMemberInvitationDao: RepositoryMemberInvitationDao,
    storeDriver: STORE_DRIVER,
    synchronizationOutManager: SynchronizationOutManager,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionHistoryDuo: TransactionHistoryDuo,
})

TRANSACTIONAL_RECEIVER.setDependencies({
    actorDao: ActorDao,
    ddlApplicationDao: DdlApplicationDao,
    databaseManager: DatabaseManager,
    applicationNameUtils: ApplicationNameUtils,
    internalRecordManager: InternalRecordManager,
    localApiServer: LOCAL_API_SERVER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER,
    transactionalServer: TRANSACTIONAL_SERVER
})

TRANSACTIONAL_SERVER.setDependencies({
    appTrackerUtils: AppTrackerUtils,
    deleteManager: DeleteManager,
    insertManager: InsertManager,
    observableQueryAdapter: ObservableQueryAdapter,
    operationManager: OperationManager,
    queryManager: QueryManager,
    repositoryManager: REPOSITORY_MANAGER,
    terminalStore: TerminalStore,
    transactionManager: TRANSACTION_MANAGER,
    updateManager: UpdateManager
})

terminal.setDependencies(UpdateManager, {
    airportDatabase: AIRPORT_DATABASE,
    currentValueMappingDao: CurrentValueMappingDao,
    datastructureUtils: DatastructureUtils,
    dictionary: Dictionary,
    fieldUtils: FieldUtils,
    historyManager: HISTORY_MANAGER,
    operationHistoryDuo: OperationHistoryDuo,
    queryFacade: QUERY_FACADE,
    queryUtils: QUERY_UTILS,
    recordHistoryDuo: RecordHistoryDuo,
    queryRelationManager: QUERY_RELATION_MANAGER,
    repositoryTransactionHistoryDuo: RepositoryTransactionHistoryDuo,
    systemWideOperationIdUtils: SystemWideOperationIdUtils,
})
