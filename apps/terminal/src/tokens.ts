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

export const DATABASE_MANAGER    = terminal.token<IDatabaseManager>('IDatabaseManager')
export const DELETE_MANAGER      = terminal.token<IDeleteManager>('IDeleteManager')
export const HISTORY_MANAGER     = terminal.token<IHistoryManager>('IHistoryManager')
export const INSERT_MANAGER      = terminal.token<IInsertManager>('IInsertManager')
export const OFFLINE_DELTA_STORE = terminal.token<IOfflineDeltaStore>('IOfflineDeltaStore')
export const ONLINE_MANAGER      = terminal.token<IOnlineManager>('IOnlineManager')
export const QUERY_MANAGER       = terminal.token<IQueryManager>('IQueryManager')
export const REPOSITORY_MANAGER  = terminal.token<IRepositoryManager>('IRepositoryManager')
export const UPDATE_MANAGER      = terminal.token<IUpdateManager>('IUpdateManager')
