import {system}                   from '@airport/di'
import {ITransactionalServer}     from './core/data/ITransactionalServer'
import {IDependencyGraphResolver} from './DependencyGraphResolver'
import {IStructuralEntityValidator}         from './StructuralEntityValidator'
import {IOperationContextLoader}  from './OperationContext'

const tower = system('airport').lib('tower')

export const DEPENDENCY_GRAPH_RESOLVER   = tower.token<IDependencyGraphResolver>('IDependencyGraphResolver')
export const OPERATION_CONTEXT_LOADER = tower.token<IOperationContextLoader>('IOperationContextLoader')
export const STRUCTURAL_ENTITY_VALIDATOR = tower.token<IStructuralEntityValidator>('IStructuralEntityValidator')
export const TRANS_SERVER             = tower.token<ITransactionalServer>('ITransactionalServer')
