import { system } from '@airport/di';
const tower = system('airport').lib('tower');
export const TRANS_SERVER = tower.token('ITransactionalServer');
export const OPERATION_CONTEXT_LOADER = tower.token('IOperationContextLoader');
export const DEPENDENCY_GRAPH_RESOLVER = tower.token('IDependencyGraphResolver');
export const ENTITY_VALIDATOR = tower.token('IEntityValidator');
//# sourceMappingURL=tokens.js.map