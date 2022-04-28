import { RecordHistory } from '../../ddl/ddl';
import { BaseRecordHistoryDuo, } from '../../generated/generated';
export class RecordHistoryDuo extends BaseRecordHistoryDuo {
    getNewRecord(actorId, actorRecordId) {
        const recordHistory = new RecordHistory();
        recordHistory.actorRecordId = actorRecordId;
        recordHistory.actor = {
            id: actorId
        };
        return recordHistory;
    }
    addNewValue(recordHistory, dbColumn, newValue) {
        if (newValue === null) {
            // No need to record a null value
            return null;
        }
        const recordHistoryNewValue = this.recordHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue);
        recordHistory.newValues.push(recordHistoryNewValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue);
        return recordHistoryNewValue;
    }
    addOldValue(recordHistory, dbColumn, oldValue) {
        if (oldValue === null) {
            // No need to record a null value
            return null;
        }
        const recordHistoryOldValue = this.recordHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue);
        recordHistory.oldValues.push(recordHistoryOldValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue);
        return recordHistoryOldValue;
    }
}
//# sourceMappingURL=RecordHistoryDuo.js.map