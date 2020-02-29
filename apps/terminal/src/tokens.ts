import {system}            from '@airport/di'
import {IRepositoryManager} from './core/repository/RepositoryManager'
import {IOfflineDeltaStore} from './data/OfflineDeltaStore'
import {IOnlineManager}     from './net/OnlineManager'
import {IDatabaseManager}   from './orchestration/DatabaseManager'
import {IDeleteManager}     from './orchestration/DeleteManager'
import {IHistoryManager}    from './orchestration/HistoryManager'
import {IInsertManager}     from './orchestration/InsertManager'
import {IQueryManager}      from './orchestration/QueryManager'
import {IUpdateManager}     from './orchestration/UpdateManager'

const terminal = system('airport').lib('terminal')

export const DATABASE_MANAGER    = terminal.token<IDatabaseManager>()
export const DELETE_MANAGER      = terminal.token<IDeleteManager>()
export const HISTORY_MANAGER     = terminal.token<IHistoryManager>()
export const INSERT_MANAGER      = terminal.token<IInsertManager>()
export const OFFLINE_DELTA_STORE = terminal.token<IOfflineDeltaStore>()
export const ONLINE_MANAGER      = terminal.token<IOnlineManager>()
export const QUERY_MANAGER       = terminal.token<IQueryManager>()
export const REPOSITORY_MANAGER  = terminal.token<IRepositoryManager>()
export const UPDATE_MANAGER      = terminal.token<IUpdateManager>()
