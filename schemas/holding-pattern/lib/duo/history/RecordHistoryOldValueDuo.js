import { DI } from '@airport/di';
import { RecordHistoryOldValue } from '../../ddl/ddl';
import { RECORD_HISTORY_OLD_VALUE_DUO } from '../../tokens';
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
DI.set(RECORD_HISTORY_OLD_VALUE_DUO, RecordHistoryOldValueDuo);
//# sourceMappingURL=RecordHistoryOldValueDuo.js.map