import { RecordHistoryNewValueDao } from '../dao/history/RecordHistoryNewValueDao';
import { RecordHistoryOldValueDao } from '../dao/history/RecordHistoryOldValueDao';
import { RepositoryTransactionHistoryDao } from '../dao/history/RepositoryTransactionHistoryDao';
import { ActorDao } from '../dao/infrastructure/ActorDao';
import { RepositoryDao } from '../dao/repository/RepositoryDao';
import { OperationHistoryDuo } from '../duo/history/OperationHistoryDuo';
import { RecordHistoryDuo } from '../duo/history/RecordHistoryDuo';
import { RecordHistoryNewValueDuo } from '../duo/history/RecordHistoryNewValueDuo';
import { RecordHistoryOldValueDuo } from '../duo/history/RecordHistoryOldValueDuo';
import { RepositoryTransactionHistoryDuo } from '../duo/history/RepositoryTransactionHistoryDuo';
import { TransactionHistoryDuo } from '../duo/history/TransactionHistoryDuo';
import { holdingPattern } from './common-tokens';
export const ACTOR_DAO = holdingPattern.token({
    class: ActorDao,
    interface: 'IActorDao',
    token: 'ACTOR_DAO'
});
export const OPERATION_HISTORY_DUO = holdingPattern.token({
    class: OperationHistoryDuo,
    interface: 'IOperationHistoryDuo',
    token: 'OPERATION_HISTORY_DUO'
});
export const RECORD_HISTORY_DUO = holdingPattern.token({
    class: RecordHistoryDuo,
    interface: 'IRecordHistoryDuo',
    token: 'RECORD_HISTORY_DUO'
});
export const RECORD_HISTORY_NEW_VALUE_DAO = holdingPattern.token({
    class: RecordHistoryNewValueDao,
    interface: 'IRecordHistoryNewValueDao',
    token: 'RECORD_HISTORY_NEW_VALUE_DAO'
});
export const RECORD_HISTORY_NEW_VALUE_DUO = holdingPattern.token({
    class: RecordHistoryNewValueDuo,
    interface: 'IRecordHistoryNewValueDuo',
    token: 'RECORD_HISTORY_NEW_VALUE_DUO'
});
export const RECORD_HISTORY_OLD_VALUE_DAO = holdingPattern.token({
    class: RecordHistoryOldValueDao,
    interface: 'IRecordHistoryOldValueDao',
    token: 'RECORD_HISTORY_OLD_VALUE_DAO'
});
export const RECORD_HISTORY_OLD_VALUE_DUO = holdingPattern.token({
    class: RecordHistoryOldValueDuo,
    interface: 'IRecordHistoryOldValueDuo',
    token: 'RECORD_HISTORY_OLD_VALUE_DUO'
});
export const REPOSITORY_DAO = holdingPattern.token({
    class: RepositoryDao,
    interface: 'IRepositoryDao',
    token: 'REPOSITORY_DAO'
});
export const REPOSITORY_TRANSACTION_HISTORY_DAO = holdingPattern.token({
    class: RepositoryTransactionHistoryDao,
    interface: 'IRepositoryTransactionHistoryDao',
    token: 'REPOSITORY_TRANSACTION_HISTORY_DAO'
});
export const REPOSITORY_TRANSACTION_HISTORY_DUO = holdingPattern.token({
    class: RepositoryTransactionHistoryDuo,
    interface: 'IRepositoryTransactionHistoryDuo',
    token: 'REPOSITORY_TRANSACTION_HISTORY_DUO'
});
export const TRANSACTION_HISTORY_DUO = holdingPattern.token({
    class: TransactionHistoryDuo,
    interface: 'ITransactionHistoryDuo',
    token: 'TRANSACTION_HISTORY_DUO'
});
OPERATION_HISTORY_DUO.setDependencies({
    recordHistoryDuo: RECORD_HISTORY_DUO,
});
RECORD_HISTORY_DUO.setDependencies({
    recordHistoryNewValueDuo: RECORD_HISTORY_NEW_VALUE_DUO,
    recordHistoryOldValueDuo: RECORD_HISTORY_OLD_VALUE_DUO,
});
REPOSITORY_TRANSACTION_HISTORY_DUO.setDependencies({
    operationHistoryDuo: OPERATION_HISTORY_DUO,
});
TRANSACTION_HISTORY_DUO.setDependencies({
    repositoryTransactionHistoryDuo: REPOSITORY_TRANSACTION_HISTORY_DUO,
});
//# sourceMappingURL=runtime-tokens.js.map