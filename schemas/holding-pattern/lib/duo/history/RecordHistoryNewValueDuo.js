import { DI } from '@airport/di';
import { RecordHistoryNewValue } from '../../ddl/ddl';
import { RECORD_HISTORY_NEW_VALUE_DUO } from '../../tokens';
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
DI.set(RECORD_HISTORY_NEW_VALUE_DUO, RecordHistoryNewValueDuo);
//# sourceMappingURL=RecordHistoryNewValueDuo.js.map