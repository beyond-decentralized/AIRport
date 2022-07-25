var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { RecordHistoryOldValue } from '../../ddl/ddl';
let RecordHistoryOldValueDuo = class RecordHistoryOldValueDuo {
    getNewRecord(recordHistory, dbColumn, oldValue) {
        const recordHistoryOldValue = new RecordHistoryOldValue();
        recordHistoryOldValue.columnIndex = dbColumn.index;
        recordHistoryOldValue.recordHistory = recordHistory;
        recordHistoryOldValue.oldValue = oldValue;
        return recordHistoryOldValue;
    }
};
RecordHistoryOldValueDuo = __decorate([
    Injected()
], RecordHistoryOldValueDuo);
export { RecordHistoryOldValueDuo };
//# sourceMappingURL=RecordHistoryOldValueDuo.js.map