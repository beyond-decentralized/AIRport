"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RecordHistoryDuo extends generated_1.BaseRecordHistoryDuo {
    getNewRecord(actorRecordId) {
        const recordHistory = new ddl_1.RecordHistory();
        recordHistory.actorRecordId = actorRecordId;
        return recordHistory;
    }
    addNewValue(recordHistory, dbColumn, newValue, recHistoryNewValueDuo) {
        const recordHistoryNewValue = recHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue);
        recordHistory.newValues.push(recordHistoryNewValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue);
        return recordHistoryNewValue;
    }
    addOldValue(recordHistory, dbColumn, oldValue, recHistoryOldValueDuo) {
        const recordHistoryOldValue = recHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue);
        recordHistory.oldValues.push(recordHistoryOldValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue);
        return recordHistoryOldValue;
    }
}
exports.RecordHistoryDuo = RecordHistoryDuo;
di_1.DI.set(diTokens_1.REC_HISTORY_DUO, RecordHistoryDuo);
//# sourceMappingURL=RecordHistoryDuo.js.map