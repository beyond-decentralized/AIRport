import {
    AIRPORT_DATABASE,
    APPLICATION_UTILS,
    FIELD_UTILS,
    Q_METADATA_UTILS,
    RELATION_MANAGER,
    REPOSITORY_LOADER,
    UTILS
} from '@airport/air-traffic-control'
import { APPLICATION_DAO, DOMAIN_DAO } from '@airport/airspace'
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
    SYNCHRONIZATION_ADAPTER_LOADER,
    SYNCHRONIZATION_IN_MANAGER,
    SYNCHRONIZATION_OUT_MANAGER
} from '@airport/ground-transport'
import {
    ACTOR_DAO,
    OPERATION_HISTORY_DUO,
    RECORD_HISTORY_DUO,
    REPOSITORY_DAO,
    REPOSITORY_TRANSACTION_HISTORY_DAO,
    REPOSITORY_TRANSACTION_HISTORY_DUO,
    TRANSACTION_HISTORY_DUO
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index'
import { QUERY_FACADE } from '@airport/tarmaq-dao'
import { QUERY_UTILS } from '@airport/tarmaq-query'
import {
    APPLICATION_INITIALIZER,
    ICascadeGraphVerifier,
    IDatabaseManager,
    IDeleteManager,
    IDependencyGraphResolver,
    IEntityGraphReconstructor,
    IHistoryManager,
    IInsertManager,
    IOperationManager,
    IQueryManager,
    IRepositoryManager,
    IStructuralEntityValidator,
    ITerminalSessionManager,
    IUpdateManager,
    STORE_DRIVER,
    TERMINAL_STORE,
    TRANSACTIONAL_RECEIVER,
    TRANSACTIONAL_SERVER,
    TRANSACTION_MANAGER,
    USER_STORE
} from '@airport/terminal-map'
import { RepositoryLoader } from './core/repository/RepositoryLoader'
import { RepositoryManager } from './core/repository/RepositoryManager'
import { TerminalSessionManager } from './core/TerminalSessionManager'
import { IInternalRecordManager, InternalRecordManager } from './data/InternalRecordManager'
import { InternalTransactionalConnector } from './net/InternalTransactionalConnector'
import { IOnlineManager, OnlineManager } from './net/OnlineManager'
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


export const ABSTRACT_MUTATION_MANAGER = terminal.token<AbstractMutationManager>({
    class: AbstractMutationManager,
    interface: 'class AbstractMutationManager',
    token: 'ABSTRACT_MUTATION_MANAGER'
})
export const ABSTRACT_TRANSACTIONAL_RECEIVER = terminal.token<TransactionalReceiver>({
    class: TransactionalReceiver,
    interface: 'class TransactionalReceiver',
    token: 'ABSTRACT_TRANSACTIONAL_RECEIVER'
})
export const CASCADE_GRAPH_VERIFIER = terminal.token<ICascadeGraphVerifier>({
    class: CascadeGraphVerifier,
    interface: 'ICascadeGraphVerifier',
    token: 'CASCADE_GRAPH_VERIFIER'
})
export const DATABASE_MANAGER = terminal.token<IDatabaseManager>({
    class: DatabaseManager,
    interface: 'IDatabaseManager',
    token: 'DATABASE_MANAGER'
})
export const DELETE_MANAGER = terminal.token<IDeleteManager>({
    class: DeleteManager,
    interface: 'IDeleteManager',
    token: 'DELETE_MANAGER'
})
export const DEPENDENCY_GRAPH_RESOLVER = terminal.token<IDependencyGraphResolver>({
    class: DependencyGraphResolver,
    interface: 'IDependencyGraphResolver',
    token: 'DEPENDENCY_GRAPH_RESOLVER'
})
export const ENTITY_GRAPH_RECONSTRUCTOR = terminal.token<IEntityGraphReconstructor>({
    class: EntityGraphReconstructor,
    interface: 'IEntityGraphReconstructor',
    token: 'ENTITY_GRAPH_RECONSTRUCTOR'
})
export const HISTORY_MANAGER = terminal.token<IHistoryManager>({
    class: HistoryManager,
    interface: 'IHistoryManager',
    token: 'HISTORY_MANAGER'
})
export const INSERT_MANAGER = terminal.token<IInsertManager>({
    class: InsertManager,
    interface: 'IInsertManager',
    token: 'INSERT_MANAGER'
})
export const INTERNAL_RECORD_MANAGER = terminal.token<IInternalRecordManager>({
    class: InternalRecordManager,
    interface: 'IInternalRecordManager',
    token: 'INTERNAL_RECORD_MANAGER'
})
export const ONLINE_MANAGER = terminal.token<IOnlineManager>({
    class: OnlineManager,
    interface: 'IOnlineManager',
    token: 'ONLINE_MANAGER'
})
export const OPERATION_MANAGER = terminal.token<IOperationManager>({
    class: OperationManager,
    interface: 'IOperationManager',
    token: 'OPERATION_MANAGER'
})
export const QUERY_MANAGER = terminal.token<IQueryManager>({
    class: QueryManager,
    interface: 'IQueryManager',
    token: 'QUERY_MANAGER'
})
export const REPOSITORY_MANAGER = terminal.token<IRepositoryManager>({
    class: RepositoryManager,
    interface: 'IRepositoryManager',
    token: 'REPOSITORY_MANAGER'
})
export const STRUCTURAL_ENTITY_VALIDATOR = terminal.token<IStructuralEntityValidator>({
    class: StructuralEntityValidator,
    interface: 'IStructuralEntityValidator',
    token: 'STRUCTURAL_ENTITY_VALIDATOR'
})
export const UPDATE_MANAGER = terminal.token<IUpdateManager>({
    class: UpdateManager,
    interface: 'IUpdateManager',
    token: 'UPDATE_MANAGER'
})

ABSTRACT_MUTATION_MANAGER.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    fieldUtils: FIELD_UTILS,
    queryUtils: QUERY_UTILS,
    relationManager: RELATION_MANAGER
})

ABSTRACT_TRANSACTIONAL_RECEIVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER
})

DATABASE_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationDao: APPLICATION_DAO,
    applicationInitializer: APPLICATION_INITIALIZER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    internalRecordManager: INTERNAL_RECORD_MANAGER,
    storeDriver: STORE_DRIVER,
    transactionalServer: TRANSACTIONAL_SERVER,
    transactionManager: TRANSACTION_MANAGER
})

DELETE_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    historyManager: HISTORY_MANAGER,
    operationHistoryDuo: OPERATION_HISTORY_DUO,
    recordHistoryDuo: RECORD_HISTORY_DUO,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    sequenceGenerator: SEQUENCE_GENERATOR,
    utils: UTILS
})

DEPENDENCY_GRAPH_RESOLVER.setDependencies({
    entityStateManager: ENTITY_STATE_MANAGER
})

ENTITY_GRAPH_RECONSTRUCTOR.setDependencies({
    entityStateManager: ENTITY_STATE_MANAGER
})

HISTORY_MANAGER.setDependencies({
    transactionHistoryDuo: TRANSACTION_HISTORY_DUO,
})

INSERT_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    historyManager: HISTORY_MANAGER,
    operationHistoryDuo: OPERATION_HISTORY_DUO,
    recordHistoryDuo: RECORD_HISTORY_DUO,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    sequenceGenerator: SEQUENCE_GENERATOR
})

INTERNAL_RECORD_MANAGER.setDependencies({
    actorDao: ACTOR_DAO,
    applicationDao: APPLICATION_DAO,
    domainDao: DOMAIN_DAO,
    entityStateManager: ENTITY_STATE_MANAGER,
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER
})

ONLINE_MANAGER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
    repositoryManager: REPOSITORY_MANAGER,
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO,
    transactionManager: TRANSACTION_MANAGER
})

OPERATION_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    cascadeGraphVerifier: CASCADE_GRAPH_VERIFIER,
    deleteManager: DELETE_MANAGER,
    dependencyGraphResolver: DEPENDENCY_GRAPH_RESOLVER,
    entityGraphReconstructor: ENTITY_GRAPH_RECONSTRUCTOR,
    entityStateManager: ENTITY_STATE_MANAGER,
    insertManager: INSERT_MANAGER,
    qMetadataUtils: Q_METADATA_UTILS,
    queryFacade: QUERY_FACADE,
    repositoryManager: REPOSITORY_MANAGER,
    structuralEntityValidator: STRUCTURAL_ENTITY_VALIDATOR,
    updateManager: UPDATE_MANAGER,
    utils: UTILS
})

QUERY_MANAGER.setDependencies({
    actorDao: ACTOR_DAO,
    airportDatabase: AIRPORT_DATABASE,
    observableQueryAdapter: OBSERVABLE_QUERY_ADAPTER,
    repositoryDao: REPOSITORY_DAO,
    repositoryLoader: REPOSITORY_LOADER,
    storeDriver: STORE_DRIVER
})

REPOSITORY_LOADER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
    synchronizationAdapterLoader: SYNCHRONIZATION_ADAPTER_LOADER,
    synchronizationInManager: SYNCHRONIZATION_IN_MANAGER
})

REPOSITORY_MANAGER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
})

STRUCTURAL_ENTITY_VALIDATOR.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
})

TERMINAL_SESSION_MANAGER.setClass(TerminalSessionManager)
TERMINAL_SESSION_MANAGER.setDependencies({
    terminalStore: TERMINAL_STORE,
    userStore: USER_STORE
})

TRANSACTION_MANAGER.setDependencies({
    activeQueries: ACTIVE_QUERIES,
    idGenerator: ID_GENERATOR,
    synchronizationOutManager: SYNCHRONIZATION_OUT_MANAGER,
    transactionHistoryDuo: TRANSACTION_HISTORY_DUO,
})

TRANSACTIONAL_RECEIVER.setDependencies({
    actorDao: ACTOR_DAO,
    applicationDao: APPLICATION_DAO,
    databaseManager: DATABASE_MANAGER,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    internalRecordManager: INTERNAL_RECORD_MANAGER,
    terminalSessionManager: TERMINAL_SESSION_MANAGER,
    terminalStore: TERMINAL_STORE,
    transactionManager: TRANSACTION_MANAGER,
    transactionalServer: TRANSACTIONAL_SERVER
})

TRANSACTIONAL_SERVER.setDependencies({
    deleteManager: DELETE_MANAGER,
    insertManager: INSERT_MANAGER,
    operationManager: OPERATION_MANAGER,
    queryManager: QUERY_MANAGER,
    repositoryManager: REPOSITORY_MANAGER,
    updateManager: UPDATE_MANAGER
})


UPDATE_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    fieldUtils: FIELD_UTILS,
    historyManager: HISTORY_MANAGER,
    operationHistoryDuo: OPERATION_HISTORY_DUO,
    queryFacade: QUERY_FACADE,
    queryUtils: QUERY_UTILS,
    recordHistoryDuo: RECORD_HISTORY_DUO,
    relationManager: RELATION_MANAGER,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    sequenceGenerator: SEQUENCE_GENERATOR,
})
