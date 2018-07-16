import {Token}                             from "typedi/Token";
import {IDailyArchiveLogDao}               from "./dao/archive/DailyArchiveLogDao";
import {IRepositoryDao}                    from "./dao/repository/RepositoryDao";
import {ISyncLogDao}                       from "./dao/synchronization/SyncLogDao";
import {IAgtRepositoryTransactionBlockDao} from "./dao/synchronization/AgtRepositoryTransactionBlockDao";
import {IAgtSharingMessageDao,}            from "./dao/synchronization/AgtSharingMessageDao";
import {ITerminalDao}                      from "./dao/terminal/TerminalDao";
import {ITerminalRepositoryDao}            from "./dao/terminal/TerminalRepositoryDao";

export const DailyArchiveLogDaoToken    = new Token<IDailyArchiveLogDao>();
export const TerminalDaoToken           = new Token<ITerminalDao>();
export const TerminalRepositoryDaoToken = new Token<ITerminalRepositoryDao>();
export const RepositoryDaoToken         = new Token<IRepositoryDao>();
export const SyncLogDaoToken            = new Token<ISyncLogDao>();
export const AgtSharingMessageDaoToken  = new Token<IAgtSharingMessageDao>();
export const AgtRepositoryTransactionBlockDaoToken
                                        = new Token<IAgtRepositoryTransactionBlockDao>();