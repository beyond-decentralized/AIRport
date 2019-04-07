"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RecordHistoryOldValueDuo extends generated_1.BaseRecordHistoryOldValueDuo {
    constructor() {
        super();
    }
    getNewRecord(recordHistory, dbColumn, oldValue) {
        const recordHistoryOldValue = new ddl_1.RecordHistoryOldValue();
        recordHistoryOldValue.columnIndex = dbColumn.index;
        recordHistoryOldValue.recordHistory = recordHistory;
        recordHistoryOldValue.oldValue = oldValue;
        return recordHistoryOldValue;
    }
}
exports.RecordHistoryOldValueDuo = RecordHistoryOldValueDuo;
di_1.DI.set(diTokens_1.REC_HIST_OLD_VALUE_DUO, RecordHistoryOldValueDuo);
//# sourceMappingURL=RecordHistoryOldValueDuo.js.map