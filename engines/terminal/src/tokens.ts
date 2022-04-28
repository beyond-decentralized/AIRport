import { AIRPORT_DATABASE, APPLICATION_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, REPOSITORY_LOADER } from '@airport/air-control'
import { APPLICATION_DAO, DOMAIN_DAO } from '@airport/airspace'
import { SEQUENCE_GENERATOR } from '@airport/check-in'
import { lib } from '@airport/direction-indicator'
import { ENTITY_STATE_MANAGER } from '@airport/ground-control'
import { ACTOR_DAO, OPERATION_HISTORY_DUO, RECORD_HISTORY_DUO, RECORD_HISTORY_NEW_VALUE_DUO, RECORD_HISTORY_OLD_VALUE_DUO, REPOSITORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DUO, TRANSACTION_HISTORY_DUO } from '@airport/holding-pattern'
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
    IUpdateManager,
    STORE_DRIVER,
    TERMINAL_STORE,
    TRANSACTIONAL_SERVER,
    TRANSACTION_MANAGER
} from '@airport/terminal-map'
import { IInternalRecordManager } from './data/InternalRecordManager'
import { IOnlineManager } from './net/OnlineManager'
import { TransactionalReceiver } from './net/TransactionalReceiver'
import { AbstractMutationManager } from './orchestration/AbstractMutationManager'

const terminal = lib('terminal')

export const ABSTRACT_MUTATION_MANAGER = terminal.token<AbstractMutationManager>({
    class: AbstractMutationManager,
    interface: 'class AbstractMutationManager',
    token: 'ABSTRACT_MUTATION_MANAGER'
})
export const ABSTRACT_TRANSACTIONAL_RECIEVER = terminal.token<TransactionalReceiver>({
    class: TransactionalReceiver,
    interface: 'class TransactionalReceiver',
    token: 'ABSTRACT_TRANSACTIONAL_RECIEVER'
})
export const CASCADE_GRAPH_VERIFIER = terminal.token<ICascadeGraphVerifier>('CASCADE_GRAPH_VERIFIER')
export const DATABASE_MANAGER = terminal.token<IDatabaseManager>('DATABASE_MANAGER')
export const DELETE_MANAGER = terminal.token<IDeleteManager>('DELETE_MANAGER')
export const DEPENDENCY_GRAPH_RESOLVER = terminal.token<IDependencyGraphResolver>('DEPENDENCY_GRAPH_RESOLVER')
export const ENTITY_GRAPH_RECONSTRUCTOR = terminal.token<IEntityGraphReconstructor>('ENTITY_GRAPH_RECONSTRUCTOR')
export const HISTORY_MANAGER = terminal.token<IHistoryManager>('HISTORY_MANAGER')
export const INSERT_MANAGER = terminal.token<IInsertManager>('INSERT_MANAGER')
export const INTERNAL_RECORD_MANAGER = terminal.token<IInternalRecordManager>('INTERNAL_RECORD_MANAGER')
export const ONLINE_MANAGER = terminal.token<IOnlineManager>('ONLINE_MANAGER')
export const OPERATION_MANAGER = terminal.token<IOperationManager>('OPERATION_MANAGER')
export const QUERY_MANAGER = terminal.token<IQueryManager>('QUERY_MANAGER')
export const REPOSITORY_MANAGER = terminal.token<IRepositoryManager>('REPOSITORY_MANAGER')
export const STRUCTURAL_ENTITY_VALIDATOR = terminal.token<IStructuralEntityValidator>('STRUCTURAL_ENTITY_VALIDATOR')
export const UPDATE_MANAGER = terminal.token<IUpdateManager>('UPDATE_MANAGER')

ABSTRACT_MUTATION_MANAGER.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    fieldUtils: FIELD_UTILS,
    queryUtils: QUERY_UTILS
})

ABSTRACT_TRANSACTIONAL_RECIEVER.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER
})

DATABASE_MANAGER.setDependencies({
    applicationDao: APPLICATION_DAO,
    applicationInitializer: APPLICATION_INITIALIZER,
    storeDriver: STORE_DRIVER,
    transactionalServer: TRANSACTIONAL_SERVER
})

DELETE_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    applicationUtils: APPLICATION_UTILS,
    operationHistoryDuo: OPERATION_HISTORY_DUO,
    recordHistoryDuo: RECORD_HISTORY_DUO,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
    sequenceGenerator: SEQUENCE_GENERATOR
})

HISTORY_MANAGER.setDependencies({
    transactionHistoryDuo: TRANSACTION_HISTORY_DUO,
})

INSERT_MANAGER.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    operationHistoryDuo: OPERATION_HISTORY_DUO,
    recordHistoryDuo: RECORD_HISTORY_DUO,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
})

INTERNAL_RECORD_MANAGER.setDependencies({
    actorDao: ACTOR_DAO,
    applicationDao: APPLICATION_DAO,
    domainDao: DOMAIN_DAO,
    entityStateManager: ENTITY_STATE_MANAGER,
    terminalStore: TERMINAL_STORE
})

ONLINE_MANAGER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
    repositoryTransactionHistoryDao: REPOSITORY_TRANSACTION_HISTORY_DAO
})

OPERATION_MANAGER.setDependencies({
    entityStateManager: ENTITY_STATE_MANAGER,
})

QUERY_MANAGER.setDependencies({
    repositoryLoader: REPOSITORY_LOADER,
    storeDriver: STORE_DRIVER
})

REPOSITORY_LOADER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
})

REPOSITORY_MANAGER.setDependencies({
    repositoryDao: REPOSITORY_DAO,
})

TRANSACTION_MANAGER.setDependencies({
    transactionHistoryDuo: TRANSACTION_HISTORY_DUO,
})

UPDATE_MANAGER.setDependencies({
    operationHistoryDuo: OPERATION_HISTORY_DUO,
    queryFacade: QUERY_FACADE,
    sequenceGenerator: SEQUENCE_GENERATOR,
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
})
