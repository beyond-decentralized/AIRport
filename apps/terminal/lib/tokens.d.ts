import { IRepositoryManager } from './core/repository/RepositoryManager';
import { IOfflineDeltaStore } from './data/OfflineDeltaStore';
import { IOnlineManager } from './net/OnlineManager';
import { IDatabaseManager } from './orchestration/DatabaseManager';
import { IDeleteManager } from './orchestration/DeleteManager';
import { IHistoryManager } from './orchestration/HistoryManager';
import { IInsertManager } from './orchestration/InsertManager';
import { IQueryManager } from './orchestration/QueryManager';
import { IUpdateManager } from './orchestration/UpdateManager';
export declare const DATABASE_MANAGER: import("@airport/di/lib/Token").IDiToken<IDatabaseManager>;
export declare const DELETE_MANAGER: import("@airport/di/lib/Token").IDiToken<IDeleteManager>;
export declare const HISTORY_MANAGER: import("@airport/di/lib/Token").IDiToken<IHistoryManager>;
export declare const INSERT_MANAGER: import("@airport/di/lib/Token").IDiToken<IInsertManager>;
export declare const OFFLINE_DELTA_STORE: import("@airport/di/lib/Token").IDiToken<IOfflineDeltaStore>;
export declare const ONLINE_MANAGER: import("@airport/di/lib/Token").IDiToken<IOnlineManager>;
export declare const QUERY_MANAGER: import("@airport/di/lib/Token").IDiToken<IQueryManager>;
export declare const REPOSITORY_MANAGER: import("@airport/di/lib/Token").IDiToken<IRepositoryManager>;
export declare const UPDATE_MANAGER: import("@airport/di/lib/Token").IDiToken<IUpdateManager>;
//# sourceMappingURL=tokens.d.ts.map