import {system}                           from '@airport/di'
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

export const holdingPattern = system('airport')
	.lib('holding-pattern')

export const ACTOR_DAO              = holdingPattern.token<IActorDao>()
export const OPER_HISTORY_DUO       = holdingPattern.token<IOperationHistoryDuo>()
export const REC_HISTORY_DUO        = holdingPattern.token<IRecordHistoryDuo>()
export const REC_HIST_NEW_VALUE_DAO = holdingPattern.token<IRecordHistoryNewValueDao>()
export const REC_HIST_NEW_VALUE_DUO = holdingPattern.token<IRecordHistoryNewValueDuo>()
export const REC_HIST_OLD_VALUE_DAO = holdingPattern.token<IRecordHistoryOldValueDao>()
export const REC_HIST_OLD_VALUE_DUO = holdingPattern.token<IRecordHistoryOldValueDuo>()
export const REPO_ACTOR_DAO         = holdingPattern.token<IRepositoryActorDao>()
export const REPOSITORY_DAO         = holdingPattern.token<IRepositoryDao>()
export const REPO_TRANS_HISTORY_DAO = holdingPattern.token<IRepositoryTransactionHistoryDao>()
export const REPO_TRANS_HISTORY_DUO = holdingPattern.token<IRepositoryTransactionHistoryDuo>()
export const TRANS_HISTORY_DUO      = holdingPattern.token<ITransactionHistoryDuo>()
