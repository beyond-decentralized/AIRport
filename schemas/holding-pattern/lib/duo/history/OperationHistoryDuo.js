import { DI } from '@airport/di';
import { BaseOperationHistoryDuo } from '../../generated/generated';
import { OPERATION_HISTORY_DUO } from '../../tokens';
export class OperationHistoryDuo extends BaseOperationHistoryDuo {
    getNewRecord(entityChangeType, dbEntity, repositoryTransactionHistory, systemWideOperationId) {
        let operationHistory = {
            changeType: entityChangeType,
            entity: dbEntity,
            id: undefined,
            orderNumber: ++repositoryTransactionHistory.transactionHistory.numberOfOperations,
            recordHistory: [],
            repositoryTransactionHistory: repositoryTransactionHistory,
            systemWideOperationId
        };
        return operationHistory;
    }
    sort(ew1, ew2) {
        let startId1 = ew1.orderNumber;
        let startId2 = ew2.orderNumber;
        if (startId1 > startId2) {
            return 1;
        }
        if (startId2 > startId1) {
            return -1;
        }
        return 0;
    }
    startRecordHistory(operationHistory, actorRecordId, recHistoryDuo) {
        const recordHistory = recHistoryDuo.getNewRecord(actorRecordId);
        recordHistory.operationHistory = operationHistory;
        operationHistory.recordHistory.push(recordHistory);
        operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistory.push(recordHistory);
        return recordHistory;
    }
}
DI.set(OPERATION_HISTORY_DUO, OperationHistoryDuo);
//# sourceMappingURL=OperationHistoryDuo.js.map