import {system}                   from '@airport/di'
import {ITransactionalServer}     from './core/data/ITransactionalServer'
import {IDependencyGraphResolver} from './DependencyGraphResolver'
import {IEntityValidator}         from './EntityValidator'
import {IOperationContextLoader}  from './OperationContext'

const tower = system('airport').lib('tower')

export const TRANS_SERVER             = tower.token<ITransactionalServer>('ITransactionalServer')
export const OPERATION_CONTEXT_LOADER = tower.token<IOperationContextLoader>('IOperationContextLoader')
export const DEPENDENCY_GRAPH_RESOLVER = tower.token<IDependencyGraphResolver>('IDependencyGraphResolver')
export const ENTITY_VALIDATOR = tower.token<IEntityValidator>('IEntityValidator')