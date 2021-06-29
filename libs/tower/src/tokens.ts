import { system } from '@airport/di'
import { ITransactionalServer } from './core/data/ITransactionalServer'
import { ICascadeGraphVerifier } from './processing/CascadeGraphVerifier'
import { IDependencyGraphResolver } from './processing/DependencyGraphResolver'
import { IEntityGraphReconstructor } from './processing/EntityGraphReconstructor'
import { IOperationContextLoader } from './processing/OperationContext'
import { IStructuralEntityValidator } from './processing/StructuralEntityValidator'

const tower = system('airport')
	.lib('tower')

export const CASCADE_GRAPH_VERIFIER = tower.token<ICascadeGraphVerifier>('ICascadeGraphVerifier')
export const DEPENDENCY_GRAPH_RESOLVER = tower.token<IDependencyGraphResolver>('IDependencyGraphResolver')
export const ENTITY_GRAPH_RECONSTRUCTOR = tower.token<IEntityGraphReconstructor>('IEntityGraphReconstructor')
export const OPERATION_CONTEXT_LOADER = tower.token<IOperationContextLoader>('IOperationContextLoader')
export const STRUCTURAL_ENTITY_VALIDATOR = tower.token<IStructuralEntityValidator>('IStructuralEntityValidator')
export const TRANSACTIONAL_SERVER = tower.token<ITransactionalServer>('ITransactionalServer')
