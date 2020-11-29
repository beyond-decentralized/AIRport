import {system}                     from '@airport/di'
import {ITransactionalServer}       from './core/data/ITransactionalServer'
import {IDependencyGraphResolver}   from './processing/DependencyGraphResolver'
import {IEntityGraphRestorer}       from './processing/EntityGraphRestorer'
import {IOperationContextLoader}    from './processing/OperationContext'
import {IStructuralEntityValidator} from './processing/StructuralEntityValidator'

const tower = system('airport')
	.lib('tower')

export const DEPENDENCY_GRAPH_RESOLVER   = tower.token<IDependencyGraphResolver>('IDependencyGraphResolver')
export const ENTITY_GRAPH_RESTORER       = tower.token<IEntityGraphRestorer>('IEntityGraphRestorer')
export const OPERATION_CONTEXT_LOADER    = tower.token<IOperationContextLoader>('IOperationContextLoader')
export const STRUCTURAL_ENTITY_VALIDATOR = tower.token<IStructuralEntityValidator>('IStructuralEntityValidator')
export const TRANS_SERVER                = tower.token<ITransactionalServer>('ITransactionalServer')
