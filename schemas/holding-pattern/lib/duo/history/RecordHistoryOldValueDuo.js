import { RecordHistoryOldValue } from '../../ddl/ddl';
import { BaseRecordHistoryOldValueDuo } from '../../generated/generated';
export class RecordHistoryOldValueDuo extends BaseRecordHistoryOldValueDuo {
    constructor() {
        super();
    }
    getNewRecord(recordHistory, dbColumn, oldValue) {
        const recordHistoryOldValue = new RecordHistoryOldValue();
        recordHistoryOldValue.columnIndex = dbColumn.index;
        recordHistoryOldValue.recordHistory = recordHistory;
        recordHistoryOldValue.oldValue = oldValue;
        return recordHistoryOldValue;
    }
}
//# sourceMappingURL=RecordHistoryOldValueDuo.js.map