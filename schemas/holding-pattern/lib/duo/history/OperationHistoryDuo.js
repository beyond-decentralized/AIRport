import { BaseOperationHistoryDuo } from '../../generated/generated';
export class OperationHistoryDuo extends BaseOperationHistoryDuo {
    getNewRecord(entityChangeType, dbEntity, actor, repositoryTransactionHistory, systemWideOperationId, rootTransaction) {
        let operationHistory = {
            actor,
            changeType: entityChangeType,
            entity: dbEntity,
            id: undefined,
            orderNumber: ++rootTransaction.numberOfOperations,
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
    startRecordHistory(operationHistory, actorId, actorRecordId) {
        const recordHistory = this.recordHistoryDuo.getNewRecord(actorId, actorRecordId);
        recordHistory.operationHistory = operationHistory;
        operationHistory.recordHistory.push(recordHistory);
        operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistory.push(recordHistory);
        return recordHistory;
    }
}
//# sourceMappingURL=OperationHistoryDuo.js.map