import {
	ILoggedApplication,
	ILoggedPackage,
	LoggedApplication,
	LoggedPackage
}                            from "@airport/approach-lighting-system";
import {IStoreDriver}        from "@airport/ground-control";
import {LogLevel}            from "@airport/runway-edge-lighting";
import {Token}               from "typedi";
import {IRepositoryManager}  from "./core/repository/RepositoryManager";
import {IOfflineDeltaStore}  from "./data/OfflineDeltaStore";
import {IOnlineManager}      from "./net/OnlineManager";
import {IDatabaseManager}    from "./orchestration/DatabaseManager";
import {IDeleteManager}      from "./orchestration/DeleteManager";
import {IHistoryManager}     from "./orchestration/HistoryManager";
import {IInsertManager}      from "./orchestration/InsertManager";
import {IQueryManager}       from "./orchestration/QueryManager";
import {IUpdateManager}      from "./orchestration/UpdateManager";

export const DatabaseManagerToken = new Token<IDatabaseManager>();
export const DeleteManagerToken = new Token<IDeleteManager>();
export const HistoryManagerToken = new Token<IHistoryManager>();
export const InsertManagerToken = new Token<IInsertManager>();
export const OfflineDeltaStoreToken = new Token<IOfflineDeltaStore>();
export const OnlineManagerToken = new Token<IOnlineManager>();
export const QueryManagerToken = new Token<IQueryManager>();
export const RepositoryManagerToken = new Token<IRepositoryManager>();
export const StoreDriverToken = new Token<IStoreDriver>();
export const UpdateManagerToken = new Token<IUpdateManager>();

export const TerminalLogger: ILoggedPackage
	= new LoggedPackage("terminal", LogLevel.TRACE);

export const TerminalAppLogger: ILoggedApplication
	= new LoggedApplication("Airport");
TerminalAppLogger.addPackage(TerminalLogger);

