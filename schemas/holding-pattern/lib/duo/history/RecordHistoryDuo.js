var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { RecordHistory } from '../../ddl/ddl';
import { BaseRecordHistoryDuo, } from '../../generated/generated';
let RecordHistoryDuo = class RecordHistoryDuo extends BaseRecordHistoryDuo {
    getNewRecord(actorId, _actorRecordId) {
        const recordHistory = new RecordHistory();
        recordHistory._actorRecordId = _actorRecordId;
        recordHistory.actor = {
            _localId: actorId
        };
        return recordHistory;
    }
    addNewValue(recordHistory, dbColumn, newValue) {
        if (newValue === null) {
            // No need to record a null value
            return null;
        }
        const recordHistoryNewValue = this.recordHistoryNewValueDuo.getNewRecord(recordHistory, dbColumn, newValue);
        recordHistory.newValues.push(recordHistoryNewValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryNewValues.push(recordHistoryNewValue);
        return recordHistoryNewValue;
    }
    addOldValue(recordHistory, dbColumn, oldValue) {
        if (oldValue === null) {
            // No need to record a null value
            return null;
        }
        const recordHistoryOldValue = this.recordHistoryOldValueDuo.getNewRecord(recordHistory, dbColumn, oldValue);
        recordHistory.oldValues.push(recordHistoryOldValue);
        recordHistory.operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistoryOldValues.push(recordHistoryOldValue);
        return recordHistoryOldValue;
    }
};
__decorate([
    Inject()
], RecordHistoryDuo.prototype, "recordHistoryNewValueDuo", void 0);
__decorate([
    Inject()
], RecordHistoryDuo.prototype, "recordHistoryOldValueDuo", void 0);
RecordHistoryDuo = __decorate([
    Injected()
], RecordHistoryDuo);
export { RecordHistoryDuo };
//# sourceMappingURL=RecordHistoryDuo.js.map