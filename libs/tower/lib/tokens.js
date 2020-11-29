import { system } from '@airport/di';
const tower = system('airport')
    .lib('tower');
export const DEPENDENCY_GRAPH_RESOLVER = tower.token('IDependencyGraphResolver');
export const ENTITY_GRAPH_RESTORER = tower.token('IEntityGraphRestorer');
export const OPERATION_CONTEXT_LOADER = tower.token('IOperationContextLoader');
export const STRUCTURAL_ENTITY_VALIDATOR = tower.token('IStructuralEntityValidator');
export const TRANS_SERVER = tower.token('ITransactionalServer');
//# sourceMappingURL=tokens.js.map