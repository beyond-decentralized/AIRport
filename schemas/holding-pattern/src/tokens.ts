import {system}                          from '@airport/di'
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

const groundControl = system('airport').lib('holding-pattern')

export const ACTOR_DAO              = groundControl.token<IActorDao>()
export const OPER_HISTORY_DUO       = groundControl.token<IOperationHistoryDuo>()
export const REC_HISTORY_DUO        = groundControl.token<IRecordHistoryDuo>()
export const REC_HIST_NEW_VALUE_DAO = groundControl.token<IRecordHistoryNewValueDao>()
export const REC_HIST_NEW_VALUE_DUO = groundControl.token<IRecordHistoryNewValueDuo>()
export const REC_HIST_OLD_VALUE_DAO = groundControl.token<IRecordHistoryOldValueDao>()
export const REC_HIST_OLD_VALUE_DUO = groundControl.token<IRecordHistoryOldValueDuo>()
export const REPO_ACTOR_DAO         = groundControl.token<IRepositoryActorDao>()
export const REPOSITORY_DAO         = groundControl.token<IRepositoryDao>()
export const REPO_TRANS_HISTORY_DAO = groundControl.token<IRepositoryTransactionHistoryDao>()
export const REPO_TRANS_HISTORY_DUO = groundControl.token<IRepositoryTransactionHistoryDuo>()
export const TRANS_HISTORY_DUO      = groundControl.token<ITransactionHistoryDuo>()
