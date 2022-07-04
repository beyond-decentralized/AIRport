var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { BaseOperationHistoryDuo } from '../../generated/generated';
let OperationHistoryDuo = class OperationHistoryDuo extends BaseOperationHistoryDuo {
    getNewRecord(entityChangeType, dbEntity, actor, repositoryTransactionHistory, systemWideOperationId, rootTransaction) {
        let operationHistory = {
            actor,
            changeType: entityChangeType,
            entity: dbEntity,
            _localId: undefined,
            orderNumber: ++rootTransaction.numberOfOperations,
            recordHistory: [],
            repositoryTransactionHistory: repositoryTransactionHistory,
            systemWideOperationId
        };
        return operationHistory;
    }
    sort(ew1, ew2) {
        let startId1 = ew1.orderNumber;
        let startId2 = ew2.orderNumber;
        if (startId1 > startId2) {
            return 1;
        }
        if (startId2 > startId1) {
            return -1;
        }
        return 0;
    }
    startRecordHistory(operationHistory, actorId, _actorRecordId) {
        const recordHistory = this.recordHistoryDuo.getNewRecord(actorId, _actorRecordId);
        recordHistory.operationHistory = operationHistory;
        operationHistory.recordHistory.push(recordHistory);
        operationHistory.repositoryTransactionHistory
            .transactionHistory.allRecordHistory.push(recordHistory);
        return recordHistory;
    }
};
__decorate([
    Inject()
], OperationHistoryDuo.prototype, "recordHistoryDuo", void 0);
OperationHistoryDuo = __decorate([
    Injected()
], OperationHistoryDuo);
export { OperationHistoryDuo };
//# sourceMappingURL=OperationHistoryDuo.js.map