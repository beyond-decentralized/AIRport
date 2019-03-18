import {diToken}                          from '@airport/di'
import {IRecordHistoryNewValueDao}        from './dao/history/RecordHistoryNewValueDao'
import {IRecordHistoryOldValueDao}        from './dao/history/RecordHistoryOldValueDao'
import {IRepositoryTransactionHistoryDao} from './dao/history/RepositoryTransactionHistoryDao'
import {IActorDao}                        from './dao/infrastructure/ActorDao'
import {IRepositoryActorDao}              from './dao/repository/RepositoryActorDao'
import {IRepositoryDao}                   from './dao/repository/RepositoryDao'
import {IOperationHistoryDmo}             from './dmo/history/OperationHistoryDmo'
import {IRecordHistoryDmo}                from './dmo/history/RecordHistoryDmo'
import {IRecordHistoryNewValueDmo}        from './dmo/history/RecordHistoryNewValueDmo'
import {IRecordHistoryOldValueDmo}        from './dmo/history/RecordHistoryOldValueDmo'
import {IRepositoryTransactionHistoryDmo} from './dmo/history/RepositoryTransactionHistoryDmo'
import {ITransactionHistoryDmo}           from './dmo/history/TransactionHistoryDmo'


export const ACTOR_DAO                          = diToken<IActorDao>()
export const OPERATION_HISTORY_DMO              = diToken<IOperationHistoryDmo>()
export const RECORD_HISTORY_DMO                 = diToken<IRecordHistoryDmo>()
export const RECORD_HISTORY_NEW_VALUE_DAO       = diToken<IRecordHistoryNewValueDao>()
export const RECORD_HISTORY_NEW_VALUE_DMO       = diToken<IRecordHistoryNewValueDmo>()
export const RECORD_HISTORY_OLD_VALUE_DAO       = diToken<IRecordHistoryOldValueDao>()
export const RECORD_HISTORY_OLD_VALUE_DMO       = diToken<IRecordHistoryOldValueDmo>()
export const REPOSITORY_ACTOR_DAO               = diToken<IRepositoryActorDao>()
export const REPOSITORY_DAO                     = diToken<IRepositoryDao>()
export const REPOSITORY_TRANSACTION_HISTORY_DAO = diToken<IRepositoryTransactionHistoryDao>()
export const REPOSITORY_TRANSACTION_HISTORY_DMO = diToken<IRepositoryTransactionHistoryDmo>()
export const TRANSACTION_HISTORY_DMO            = diToken<ITransactionHistoryDmo>()
