import {system}                           from '@airport/di'
import {IDailyArchiveLogDao}               from './dao/archive/DailyArchiveLogDao'
import {IRepositoryDao}                    from './dao/repository/RepositoryDao'
import {IAgtRepositoryTransactionBlockDao} from './dao/synchronization/AgtRepositoryTransactionBlockDao'
import {IAgtSharingMessageDao,}            from './dao/synchronization/AgtSharingMessageDao'
import {ISyncLogDao}                       from './dao/synchronization/SyncLogDao'
import {ITerminalDao}                      from './dao/terminal/TerminalDao'
import {ITerminalRepositoryDao}            from './dao/terminal/TerminalRepositoryDao'

const guideway = system('airport').lib('guideway')

export const DAILY_ARCHIVE_LOG_DAO    = guideway.token<IDailyArchiveLogDao>('DAILY_ARCHIVE_LOG_DAO')
export const TERMINAL_DAO             = guideway.token<ITerminalDao>('TERMINAL_DAO')
export const TERMINAL_REPOSITORY_DAO  = guideway.token<ITerminalRepositoryDao>('TERMINAL_REPOSITORY_DAO')
export const REPOSITORY_DAO           = guideway.token<IRepositoryDao>('REPOSITORY_DAO')
export const SYNC_LOG_DAO             = guideway.token<ISyncLogDao>('SYNC_LOG_DAO')
export const AGT_SHARING_MESSAGE_DAO  = guideway.token<IAgtSharingMessageDao>('AGT_SHARING_MESSAGE_DAO')
export const AGT_REPO_TRANS_BLOCK_DAO = guideway.token<IAgtRepositoryTransactionBlockDao>('AGT_REPO_TRANS_BLOCK_DAO')
