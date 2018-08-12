import { ILoggedApplication, ILoggedPackage } from "@airport/approach-lighting-system";
import { IStoreDriver } from "@airport/ground-control";
import { Token } from "typedi";
import { IRepositoryManager } from "./core/repository/RepositoryManager";
import { IOfflineDeltaStore } from "./data/OfflineDeltaStore";
import { IOnlineManager } from "./net/OnlineManager";
import { IDatabaseManager } from "./orchestration/DatabaseManager";
import { IDeleteManager } from "./orchestration/DeleteManager";
import { IHistoryManager } from "./orchestration/HistoryManager";
import { IInsertManager } from "./orchestration/InsertManager";
import { IQueryManager } from "./orchestration/QueryManager";
import { IUpdateManager } from "./orchestration/UpdateManager";
import { IActiveQueries } from "./store/ActiveQueries";
import { IIdGenerator } from "./store/IdGenerator";
export declare const ActiveQueriesToken: Token<IActiveQueries>;
export declare const DatabaseManagerToken: Token<IDatabaseManager>;
export declare const DeleteManagerToken: Token<IDeleteManager>;
export declare const HistoryManagerToken: Token<IHistoryManager>;
export declare const IdGeneratorToken: Token<IIdGenerator>;
export declare const InsertManagerToken: Token<IInsertManager>;
export declare const OfflineDeltaStoreToken: Token<IOfflineDeltaStore>;
export declare const OnlineManagerToken: Token<IOnlineManager>;
export declare const QueryManagerToken: Token<IQueryManager>;
export declare const RepositoryManagerToken: Token<IRepositoryManager>;
export declare const StoreDriverToken: Token<IStoreDriver>;
export declare const UpdateManagerToken: Token<IUpdateManager>;
export declare const TerminalLogger: ILoggedPackage;
export declare const TerminalAppLogger: ILoggedApplication;