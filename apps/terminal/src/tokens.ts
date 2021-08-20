import { system } from '@airport/di'
import { IRepositoryManager } from './core/repository/RepositoryManager'
import { IDaoRegistry } from './DaoRegistry'
import { IOfflineDeltaStore } from './data/OfflineDeltaStore'
import { ILocalAPIServer } from './LocalAPIServer'
import { IOnlineManager } from './net/OnlineManager'
import { ITransactionalReceiver } from './net/TransactionalReceiver'
import { IDatabaseManager } from './orchestration/DatabaseManager'
import { IDeleteManager } from './orchestration/DeleteManager'
import { IHistoryManager } from './orchestration/HistoryManager'
import { IInsertManager } from './orchestration/InsertManager'
import { IQueryManager } from './orchestration/QueryManager'
import { IUpdateManager } from './orchestration/UpdateManager'
import { ICascadeGraphVerifier } from './processing/CascadeGraphVerifier'
import { IDependencyGraphResolver } from './processing/DependencyGraphResolver'
import { IEntityGraphReconstructor } from './processing/EntityGraphReconstructor'
import { IOperationManager } from './processing/OperationManager'
import { IStructuralEntityValidator } from './processing/StructuralEntityValidator'

const terminal = system('airport').lib('terminal')

export const CASCADE_GRAPH_VERIFIER = terminal.token<ICascadeGraphVerifier>('ICascadeGraphVerifier')
export const DAO_REGISTRY = terminal.token<IDaoRegistry>('IDaoRegistry')
export const DATABASE_MANAGER = terminal.token<IDatabaseManager>('IDatabaseManager')
export const DELETE_MANAGER = terminal.token<IDeleteManager>('IDeleteManager')
export const DEPENDENCY_GRAPH_RESOLVER = terminal.token<IDependencyGraphResolver>('IDependencyGraphResolver')
export const ENTITY_GRAPH_RECONSTRUCTOR = terminal.token<IEntityGraphReconstructor>('IEntityGraphReconstructor')
export const HISTORY_MANAGER = terminal.token<IHistoryManager>('IHistoryManager')
export const INSERT_MANAGER = terminal.token<IInsertManager>('IInsertManager')
export const LOCAL_API_SERVER = terminal.token<ILocalAPIServer>('ILocalAPIServer')
export const OFFLINE_DELTA_STORE = terminal.token<IOfflineDeltaStore>('IOfflineDeltaStore')
export const ONLINE_MANAGER = terminal.token<IOnlineManager>('IOnlineManager')
export const OPERATION_MANAGER = terminal.token<IOperationManager>('IOperationManager')
export const QUERY_MANAGER = terminal.token<IQueryManager>('IQueryManager')
export const REPOSITORY_MANAGER = terminal.token<IRepositoryManager>('IRepositoryManager')
export const STRUCTURAL_ENTITY_VALIDATOR = terminal.token<IStructuralEntityValidator>('IStructuralEntityValidator')
export const UPDATE_MANAGER = terminal.token<IUpdateManager>('IUpdateManager')
