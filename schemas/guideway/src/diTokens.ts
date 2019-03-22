import {diToken}                           from '@airport/di'
import {IDailyArchiveLogDao}               from './dao/archive/DailyArchiveLogDao'
import {IRepositoryDao}                    from './dao/repository/RepositoryDao'
import {IAgtRepositoryTransactionBlockDao} from './dao/synchronization/AgtRepositoryTransactionBlockDao'
import {IAgtSharingMessageDao,}            from './dao/synchronization/AgtSharingMessageDao'
import {ISyncLogDao}                       from './dao/synchronization/SyncLogDao'
import {ITerminalDao}                      from './dao/terminal/TerminalDao'
import {ITerminalRepositoryDao}            from './dao/terminal/TerminalRepositoryDao'

export const DAILY_ARCHIVE_LOG_DAO    = diToken<IDailyArchiveLogDao>()
export const TERMINAL_DAO             = diToken<ITerminalDao>()
export const TERMINAL_REPOSITORY_DAO  = diToken<ITerminalRepositoryDao>()
export const REPOSITORY_DAO           = diToken<IRepositoryDao>()
export const SYNC_LOG_DAO             = diToken<ISyncLogDao>()
export const AGT_SHARING_MESSAGE_DAO  = diToken<IAgtSharingMessageDao>()
export const AGT_REPO_TRANS_BLOCK_DAO = diToken<IAgtRepositoryTransactionBlockDao>()