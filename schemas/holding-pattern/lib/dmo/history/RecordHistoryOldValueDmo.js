"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RecordHistoryOldValueDmo extends generated_1.BaseRecordHistoryOldValueDmo {
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
exports.RecordHistoryOldValueDmo = RecordHistoryOldValueDmo;
di_1.DI.set(diTokens_1.REC_HIST_OLD_VALUE_DMO, RecordHistoryOldValueDmo);
//# sourceMappingURL=RecordHistoryOldValueDmo.js.map