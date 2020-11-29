import { ITransactionalServer } from './core/data/ITransactionalServer';
import { IDependencyGraphResolver } from './processing/DependencyGraphResolver';
import { IEntityGraphRestorer } from './processing/EntityGraphRestorer';
import { IOperationContextLoader } from './processing/OperationContext';
import { IStructuralEntityValidator } from './processing/StructuralEntityValidator';
export declare const DEPENDENCY_GRAPH_RESOLVER: import("@airport/di").IDiToken<IDependencyGraphResolver>;
export declare const ENTITY_GRAPH_RESTORER: import("@airport/di").IDiToken<IEntityGraphRestorer>;
export declare const OPERATION_CONTEXT_LOADER: import("@airport/di").IDiToken<IOperationContextLoader>;
export declare const STRUCTURAL_ENTITY_VALIDATOR: import("@airport/di").IDiToken<IStructuralEntityValidator>;
export declare const TRANS_SERVER: import("@airport/di").IDiToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map