import { lib } from '@airport/direction-indicator'
import { ENTITY_STATE_MANAGER } from '@airport/ground-control'
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
import { IOnlineManager } from './net/OnlineManager'

const terminal = lib('terminal')

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

INTERNAL_RECORD_MANAGER.setDependencies({
	entityStateManager: ENTITY_STATE_MANAGER
})

OPERATION_MANAGER.setDependencies({
	entityStateManager: ENTITY_STATE_MANAGER
})