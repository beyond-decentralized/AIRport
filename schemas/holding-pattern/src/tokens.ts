import { lib } from '@airport/di'
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

export const holdingPattern = lib('holding-pattern')

export const ACTOR_DAO = holdingPattern.token<IActorDao>('ACTOR_DAO')
export const OPERATION_HISTORY_DUO = holdingPattern.token<IOperationHistoryDuo>('OPERATION_HISTORY_DUO')
export const RECORD_HISTORY_DUO = holdingPattern.token<IRecordHistoryDuo>('RECORD_HISTORY_DUO')
export const RECORD_HISTORY_NEW_VALUE_DAO = holdingPattern.token<IRecordHistoryNewValueDao>('RECORD_HISTORY_NEW_VALUE_DAO')
export const RECORD_HISTORY_NEW_VALUE_DUO = holdingPattern.token<IRecordHistoryNewValueDuo>('RECORD_HISTORY_NEW_VALUE_DUO')
export const RECORD_HISTORY_OLD_VALUE_DAO = holdingPattern.token<IRecordHistoryOldValueDao>('RECORD_HISTORY_OLD_VALUE_DAO')
export const RECORD_HISTORY_OLD_VALUE_DUO = holdingPattern.token<IRecordHistoryOldValueDuo>('RECORD_HISTORY_OLD_VALUE_DUO')
export const REPOSITORY_DAO = holdingPattern.token<IRepositoryDao>('REPOSITORY_DAO')
export const REPOSITORY_TRANSACTION_HISTORY_DAO = holdingPattern.token<IRepositoryTransactionHistoryDao>('REPOSITORY_TRANSACTION_HISTORY_DAO')
export const REPOSITORY_TRANSACTION_HISTORY_DUO = holdingPattern.token<IRepositoryTransactionHistoryDuo>('REPOSITORY_TRANSACTION_HISTORY_DUO')
export const TRANSACTION_HISTORY_DUO = holdingPattern.token<ITransactionHistoryDuo>('TRANSACTION_HISTORY_DUO')
