import { system } from '@airport/di'
import { IRecordHistoryNewValueDao } from './dao/history/RecordHistoryNewValueDao'
import { IRecordHistoryOldValueDao } from './dao/history/RecordHistoryOldValueDao'
import { IRepositoryTransactionHistoryDao } from './dao/history/RepositoryTransactionHistoryDao'
import { IActorDao } from './dao/infrastructure/ActorDao'
import { IRepositoryDao } from './dao/repository/RepositoryDao'
import { IOperationHistoryDuo } from './duo/history/OperationHistoryDuo'
import { IRecordHistoryDuo } from './duo/history/RecordHistoryDuo'
import { IRecordHistoryNewValueDuo } from './duo/history/RecordHistoryNewValueDuo'
import { IRecordHistoryOldValueDuo } from './duo/history/RecordHistoryOldValueDuo'
import { IRepositoryTransactionHistoryDuo } from './duo/history/RepositoryTransactionHistoryDuo'
import { ITransactionHistoryDuo } from './duo/history/TransactionHistoryDuo'

export const holdingPattern = system('airport')
	.lib('holding-pattern')

export const ACTOR_DAO = holdingPattern.token<IActorDao>('IActorDao')
export const OPER_HISTORY_DUO = holdingPattern.token<IOperationHistoryDuo>('IOperationHistoryDuo')
export const REC_HISTORY_DUO = holdingPattern.token<IRecordHistoryDuo>('IRecordHistoryDuo')
export const REC_HIST_NEW_VALUE_DAO = holdingPattern.token<IRecordHistoryNewValueDao>('IRecordHistoryNewValueDao')
export const REC_HIST_NEW_VALUE_DUO = holdingPattern.token<IRecordHistoryNewValueDuo>('IRecordHistoryNewValueDuo')
export const REC_HIST_OLD_VALUE_DAO = holdingPattern.token<IRecordHistoryOldValueDao>('IRecordHistoryOldValueDao')
export const REC_HIST_OLD_VALUE_DUO = holdingPattern.token<IRecordHistoryOldValueDuo>('IRecordHistoryOldValueDuo')
export const REPOSITORY_DAO = holdingPattern.token<IRepositoryDao>('IRepositoryDao')
export const REPOSITORY_TRANSACTION_HISTORY_DAO = holdingPattern.token<IRepositoryTransactionHistoryDao>('IRepositoryTransactionHistoryDao')
export const REPOSITORY_TRANSACTION_HISTORY_DUO = holdingPattern.token<IRepositoryTransactionHistoryDuo>('IRepositoryTransactionHistoryDuo')
export const TRANSACTION_HISTORY_DUO = holdingPattern.token<ITransactionHistoryDuo>('ITransactionHistoryDuo')
