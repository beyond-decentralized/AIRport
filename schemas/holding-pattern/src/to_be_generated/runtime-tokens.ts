import { IRecordHistoryNewValueDao, RecordHistoryNewValueDao } from '../dao/history/RecordHistoryNewValueDao'
import { IRecordHistoryOldValueDao, RecordHistoryOldValueDao } from '../dao/history/RecordHistoryOldValueDao'
import { IRepositoryTransactionHistoryDao, RepositoryTransactionHistoryDao } from '../dao/history/RepositoryTransactionHistoryDao'
import { IActorDao, ActorDao } from '../dao/infrastructure/ActorDao'
import { IRepositoryDao, RepositoryDao } from '../dao/repository/RepositoryDao'
import { IOperationHistoryDuo, OperationHistoryDuo } from '../duo/history/OperationHistoryDuo'
import { IRecordHistoryDuo, RecordHistoryDuo } from '../duo/history/RecordHistoryDuo'
import { IRecordHistoryNewValueDuo, RecordHistoryNewValueDuo } from '../duo/history/RecordHistoryNewValueDuo'
import { IRecordHistoryOldValueDuo, RecordHistoryOldValueDuo } from '../duo/history/RecordHistoryOldValueDuo'
import { IRepositoryTransactionHistoryDuo, RepositoryTransactionHistoryDuo } from '../duo/history/RepositoryTransactionHistoryDuo'
import { ITransactionHistoryDuo, TransactionHistoryDuo } from '../duo/history/TransactionHistoryDuo'
import { holdingPattern } from './common-tokens'

export const ACTOR_DAO = holdingPattern.token<IActorDao>({
    class: ActorDao,
    interface: 'IActorDao',
    token: 'ACTOR_DAO'
})
export const OPERATION_HISTORY_DUO = holdingPattern.token<IOperationHistoryDuo>({
    class: OperationHistoryDuo,
    interface: 'IOperationHistoryDuo',
    token: 'OPERATION_HISTORY_DUO'
})
export const RECORD_HISTORY_DUO = holdingPattern.token<IRecordHistoryDuo>({
    class: RecordHistoryDuo,
    interface: 'IRecordHistoryDuo',
    token: 'RECORD_HISTORY_DUO'
})
export const RECORD_HISTORY_NEW_VALUE_DAO = holdingPattern.token<IRecordHistoryNewValueDao>({
    class: RecordHistoryNewValueDao,
    interface: 'IRecordHistoryNewValueDao',
    token: 'RECORD_HISTORY_NEW_VALUE_DAO'
})
export const RECORD_HISTORY_NEW_VALUE_DUO = holdingPattern.token<IRecordHistoryNewValueDuo>({
    class: RecordHistoryNewValueDuo,
    interface: 'IRecordHistoryNewValueDuo',
    token: 'RECORD_HISTORY_NEW_VALUE_DUO'
})
export const RECORD_HISTORY_OLD_VALUE_DAO = holdingPattern.token<IRecordHistoryOldValueDao>({
    class: RecordHistoryOldValueDao,
    interface: 'IRecordHistoryOldValueDao',
    token: 'RECORD_HISTORY_OLD_VALUE_DAO'
})
export const RECORD_HISTORY_OLD_VALUE_DUO = holdingPattern.token<IRecordHistoryOldValueDuo>({
    class: RecordHistoryOldValueDuo,
    interface: 'IRecordHistoryOldValueDuo',
    token: 'RECORD_HISTORY_OLD_VALUE_DUO'
})
export const REPOSITORY_DAO = holdingPattern.token<IRepositoryDao>({
    class: RepositoryDao,
    interface: 'IRepositoryDao',
    token: 'REPOSITORY_DAO'
})
export const REPOSITORY_TRANSACTION_HISTORY_DAO = holdingPattern.token<IRepositoryTransactionHistoryDao>({
    class: RepositoryTransactionHistoryDao,
    interface: 'IRepositoryTransactionHistoryDao',
    token: 'REPOSITORY_TRANSACTION_HISTORY_DAO'
})
export const REPOSITORY_TRANSACTION_HISTORY_DUO = holdingPattern.token<IRepositoryTransactionHistoryDuo>({
    class: RepositoryTransactionHistoryDuo,
    interface: 'IRepositoryTransactionHistoryDuo',
    token: 'REPOSITORY_TRANSACTION_HISTORY_DUO'
})
export const TRANSACTION_HISTORY_DUO = holdingPattern.token<ITransactionHistoryDuo>({
    class: TransactionHistoryDuo,
    interface: 'ITransactionHistoryDuo',
    token: 'TRANSACTION_HISTORY_DUO'
})

OPERATION_HISTORY_DUO.setDependencies({
    recordHistoryDuo: RECORD_HISTORY_DUO,
})

RECORD_HISTORY_DUO.setDependencies({
    recordHistoryNewValueDuo: RECORD_HISTORY_NEW_VALUE_DUO,
    recordHistoryOldValueDuo: RECORD_HISTORY_OLD_VALUE_DUO,
})

REPOSITORY_TRANSACTION_HISTORY_DUO.setDependencies({
    operationHistoryDuo: OPERATION_HISTORY_DUO,
})

TRANSACTION_HISTORY_DUO.setDependencies({
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
})