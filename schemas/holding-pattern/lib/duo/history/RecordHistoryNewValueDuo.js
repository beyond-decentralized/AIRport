"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RecordHistoryNewValueDuo extends generated_1.BaseRecordHistoryNewValueDuo {
    constructor() {
        super();
    }
    getNewRecord(recordHistory, dbColumn, newValue) {
        const recordHistoryNewValue = new ddl_1.RecordHistoryNewValue();
        recordHistoryNewValue.columnIndex = dbColumn.index;
        recordHistoryNewValue.recordHistory = recordHistory;
        recordHistoryNewValue.newValue = newValue;
        return recordHistoryNewValue;
    }
}
exports.RecordHistoryNewValueDuo = RecordHistoryNewValueDuo;
di_1.DI.set(diTokens_1.REC_HIST_NEW_VALUE_DUO, RecordHistoryNewValueDuo);
//# sourceMappingURL=RecordHistoryNewValueDuo.js.map