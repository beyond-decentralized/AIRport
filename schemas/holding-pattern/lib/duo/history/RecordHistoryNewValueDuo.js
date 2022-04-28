import { RecordHistoryNewValue } from '../../ddl/ddl';
import { BaseRecordHistoryNewValueDuo } from '../../generated/generated';
export class RecordHistoryNewValueDuo extends BaseRecordHistoryNewValueDuo {
    constructor() {
        super();
    }
    getNewRecord(recordHistory, dbColumn, newValue) {
        const recordHistoryNewValue = new RecordHistoryNewValue();
        recordHistoryNewValue.columnIndex = dbColumn.index;
        recordHistoryNewValue.recordHistory = recordHistory;
        recordHistoryNewValue.newValue = newValue;
        return recordHistoryNewValue;
    }
}
//# sourceMappingURL=RecordHistoryNewValueDuo.js.map