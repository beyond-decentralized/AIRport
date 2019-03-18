"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RecordHistoryDmo extends generated_1.BaseRecordHistoryDmo {
    constructor() {
        super();
        di_1.DI.get((recordHistoryNewValueDmo, recordHistoryOldValueDmo) => {
            this.recHistoryNewValueDmo = recordHistoryNewValueDmo;
            this.recHistoryOldValueDmo = recordHistoryOldValueDmo;
        }, diTokens_1.RECORD_HISTORY_NEW_VALUE_DMO, diTokens_1.RECORD_HISTORY_OLD_VALUE_DMO);
    }
    getNewRecord(actorRecordId) {
        const recordHistory = new ddl_1.RecordHistory();
        recordHistory.actorRecordId = actorRecordId;
        return recordHistory;
    }
    addNewValue(recordHistory, dbColumn, newValue) {
        const recordHistoryNewValue = this.recHistoryNewValueDmo.getNewRecord(recordHistory, dbColumn, newValue);
        recordHistory.newValues.push(recordHistoryNewValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue);
        return recordHistoryNewValue;
    }
    addOldValue(recordHistory, dbColumn, oldValue) {
        const recordHistoryOldValue = this.recHistoryOldValueDmo.getNewRecord(recordHistory, dbColumn, oldValue);
        recordHistory.oldValues.push(recordHistoryOldValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue);
        return recordHistoryOldValue;
    }
}
exports.RecordHistoryDmo = RecordHistoryDmo;
di_1.DI.set(diTokens_1.RECORD_HISTORY_DMO, RecordHistoryDmo);
//# sourceMappingURL=RecordHistoryDmo.js.map