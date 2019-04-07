import {diToken}                          from '@airport/di'
import {IRecordHistoryNewValueDao}        from './dao/history/RecordHistoryNewValueDao'
import {IRecordHistoryOldValueDao}        from './dao/history/RecordHistoryOldValueDao'
import {IRepositoryTransactionHistoryDao} from './dao/history/RepositoryTransactionHistoryDao'
import {IActorDao}                        from './dao/infrastructure/ActorDao'
import {IRepositoryActorDao}              from './dao/repository/RepositoryActorDao'
import {IRepositoryDao}                   from './dao/repository/RepositoryDao'
import {IOperationHistoryDuo}             from './duo/history/OperationHistoryDuo'
import {IRecordHistoryDuo}                from './duo/history/RecordHistoryDuo'
import {IRecordHistoryNewValueDuo}        from './duo/history/RecordHistoryNewValueDuo'
import {IRecordHistoryOldValueDuo}        from './duo/history/RecordHistoryOldValueDuo'
import {IRepositoryTransactionHistoryDuo} from './duo/history/RepositoryTransactionHistoryDuo'
import {ITransactionHistoryDuo}           from './duo/history/TransactionHistoryDuo'


export const ACTOR_DAO              = diToken<IActorDao>()
export const OPER_HISTORY_DUO       = diToken<IOperationHistoryDuo>()
export const REC_HISTORY_DUO        = diToken<IRecordHistoryDuo>()
export const REC_HIST_NEW_VALUE_DAO = diToken<IRecordHistoryNewValueDao>()
export const REC_HIST_NEW_VALUE_DUO = diToken<IRecordHistoryNewValueDuo>()
export const REC_HIST_OLD_VALUE_DAO = diToken<IRecordHistoryOldValueDao>()
export const REC_HIST_OLD_VALUE_DUO = diToken<IRecordHistoryOldValueDuo>()
export const REPO_ACTOR_DAO         = diToken<IRepositoryActorDao>()
export const REPOSITORY_DAO         = diToken<IRepositoryDao>()
export const REPO_TRANS_HISTORY_DAO = diToken<IRepositoryTransactionHistoryDao>()
export const REPO_TRANS_HISTORY_DUO = diToken<IRepositoryTransactionHistoryDuo>()
export const TRANS_HISTORY_DUO      = diToken<ITransactionHistoryDuo>()
