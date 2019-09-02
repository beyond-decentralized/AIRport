import { IRepositoryManager } from './core/repository/RepositoryManager';
import { IOfflineDeltaStore } from './data/OfflineDeltaStore';
import { IOnlineManager } from './net/OnlineManager';
import { IDatabaseManager } from './orchestration/DatabaseManager';
import { IDeleteManager } from './orchestration/DeleteManager';
import { IHistoryManager } from './orchestration/HistoryManager';
import { IInsertManager } from './orchestration/InsertManager';
import { INonNullValidator } from './validators/NonNullValidator';
import { IQueryManager } from './orchestration/QueryManager';
import { IUpdateManager } from './orchestration/UpdateManager';
export declare const DATABASE_MANAGER: import("@airport/di").DiToken<IDatabaseManager>;
export declare const DELETE_MANAGER: import("@airport/di").DiToken<IDeleteManager>;
export declare const HISTORY_MANAGER: import("@airport/di").DiToken<IHistoryManager>;
export declare const INSERT_MANAGER: import("@airport/di").DiToken<IInsertManager>;
export declare const NON_NULL_VALIDATOR: import("@airport/di").DiToken<INonNullValidator>;
export declare const OFFLINE_DELTA_STORE: import("@airport/di").DiToken<IOfflineDeltaStore>;
export declare const ONLINE_MANAGER: import("@airport/di").DiToken<IOnlineManager>;
export declare const QUERY_MANAGER: import("@airport/di").DiToken<IQueryManager>;
export declare const REPOSITORY_MANAGER: import("@airport/di").DiToken<IRepositoryManager>;
export declare const UPDATE_MANAGER: import("@airport/di").DiToken<IUpdateManager>;
