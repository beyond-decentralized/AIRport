import {diToken}            from '@airport/di'
import {IRepositoryManager} from './core/repository/RepositoryManager'
import {IOfflineDeltaStore} from './data/OfflineDeltaStore'
import {IOnlineManager}     from './net/OnlineManager'
import {IDatabaseManager}   from './orchestration/DatabaseManager'
import {IDeleteManager}     from './orchestration/DeleteManager'
import {IHistoryManager}    from './orchestration/HistoryManager'
import {IInsertManager}     from './orchestration/InsertManager'
import {INonNullValidator}  from './validators/NonNullValidator'
import {IQueryManager}      from './orchestration/QueryManager'
import {IUpdateManager}     from './orchestration/UpdateManager'

export const DATABASE_MANAGER    = diToken<IDatabaseManager>()
export const DELETE_MANAGER      = diToken<IDeleteManager>()
export const HISTORY_MANAGER     = diToken<IHistoryManager>()
export const INSERT_MANAGER      = diToken<IInsertManager>()
export const OFFLINE_DELTA_STORE = diToken<IOfflineDeltaStore>()
export const ONLINE_MANAGER      = diToken<IOnlineManager>()
export const QUERY_MANAGER       = diToken<IQueryManager>()
export const REPOSITORY_MANAGER  = diToken<IRepositoryManager>()
export const UPDATE_MANAGER      = diToken<IUpdateManager>()

