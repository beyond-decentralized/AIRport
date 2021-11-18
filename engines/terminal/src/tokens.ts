import { system } from '@airport/di'
import {
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
    IUpdateManager
} from '@airport/terminal-map'
import { IInternalRecordManager } from './data/InternalRecordManager'
import { IOfflineDeltaStore } from './data/OfflineDeltaStore'
import { IOnlineManager } from './net/OnlineManager'

const terminal = system('airport').lib('terminal')

export const CASCADE_GRAPH_VERIFIER = terminal.token<ICascadeGraphVerifier>('ICascadeGraphVerifier')
export const DATABASE_MANAGER = terminal.token<IDatabaseManager>('IDatabaseManager')
export const DELETE_MANAGER = terminal.token<IDeleteManager>('IDeleteManager')
export const DEPENDENCY_GRAPH_RESOLVER = terminal.token<IDependencyGraphResolver>('IDependencyGraphResolver')
export const ENTITY_GRAPH_RECONSTRUCTOR = terminal.token<IEntityGraphReconstructor>('IEntityGraphReconstructor')
export const HISTORY_MANAGER = terminal.token<IHistoryManager>('IHistoryManager')
export const INSERT_MANAGER = terminal.token<IInsertManager>('IInsertManager')
export const INTERNAL_RECORD_MANAGER = terminal.token<IInternalRecordManager>('IInternalRecordManager')
export const OFFLINE_DELTA_STORE = terminal.token<IOfflineDeltaStore>('IOfflineDeltaStore')
export const ONLINE_MANAGER = terminal.token<IOnlineManager>('IOnlineManager')
export const OPERATION_MANAGER = terminal.token<IOperationManager>('IOperationManager')
export const QUERY_MANAGER = terminal.token<IQueryManager>('IQueryManager')
export const REPOSITORY_MANAGER = terminal.token<IRepositoryManager>('IRepositoryManager')
export const STRUCTURAL_ENTITY_VALIDATOR = terminal.token<IStructuralEntityValidator>('IStructuralEntityValidator')
export const UPDATE_MANAGER = terminal.token<IUpdateManager>('IUpdateManager')
