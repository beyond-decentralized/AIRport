import { IRepositoryManager } from './core/repository/RepositoryManager';
import { IDaoRegistry } from './DaoRegistry';
import { IOfflineDeltaStore } from './data/OfflineDeltaStore';
import { ILocalAPIServer } from './LocalAPIServer';
import { IOnlineManager } from './net/OnlineManager';
import { IDatabaseManager } from './orchestration/DatabaseManager';
import { IDeleteManager } from './orchestration/DeleteManager';
import { IHistoryManager } from './orchestration/HistoryManager';
import { IInsertManager } from './orchestration/InsertManager';
import { IQueryManager } from './orchestration/QueryManager';
import { IUpdateManager } from './orchestration/UpdateManager';
import { ICascadeGraphVerifier } from './processing/CascadeGraphVerifier';
import { IDependencyGraphResolver } from './processing/DependencyGraphResolver';
import { IEntityGraphReconstructor } from './processing/EntityGraphReconstructor';
import { IOperationManager } from './processing/OperationManager';
import { IStructuralEntityValidator } from './processing/StructuralEntityValidator';
export declare const CASCADE_GRAPH_VERIFIER: import("@airport/di").IDiToken<ICascadeGraphVerifier>;
export declare const DAO_REGISTRY: import("@airport/di").IDiToken<IDaoRegistry>;
export declare const DATABASE_MANAGER: import("@airport/di").IDiToken<IDatabaseManager>;
export declare const DELETE_MANAGER: import("@airport/di").IDiToken<IDeleteManager>;
export declare const DEPENDENCY_GRAPH_RESOLVER: import("@airport/di").IDiToken<IDependencyGraphResolver>;
export declare const ENTITY_GRAPH_RECONSTRUCTOR: import("@airport/di").IDiToken<IEntityGraphReconstructor>;
export declare const HISTORY_MANAGER: import("@airport/di").IDiToken<IHistoryManager>;
export declare const INSERT_MANAGER: import("@airport/di").IDiToken<IInsertManager>;
export declare const LOCAL_API_SERVER: import("@airport/di").IDiToken<ILocalAPIServer>;
export declare const OFFLINE_DELTA_STORE: import("@airport/di").IDiToken<IOfflineDeltaStore>;
export declare const ONLINE_MANAGER: import("@airport/di").IDiToken<IOnlineManager>;
export declare const OPERATION_MANAGER: import("@airport/di").IDiToken<IOperationManager>;
export declare const QUERY_MANAGER: import("@airport/di").IDiToken<IQueryManager>;
export declare const REPOSITORY_MANAGER: import("@airport/di").IDiToken<IRepositoryManager>;
export declare const STRUCTURAL_ENTITY_VALIDATOR: import("@airport/di").IDiToken<IStructuralEntityValidator>;
export declare const UPDATE_MANAGER: import("@airport/di").IDiToken<IUpdateManager>;
//# sourceMappingURL=tokens.d.ts.map