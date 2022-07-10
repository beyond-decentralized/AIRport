var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbString, Entity, GeneratedValue, Id, OneToMany, SequenceGenerator, Table, Transient } from '@airport/tarmaq-entity';
import { SyncApplicationMap } from '@airport/ground-control';
let TransactionHistory = class TransactionHistory {
    constructor() {
        this.repositoryTransactionHistories = [];
        this.repositoryTransactionHistoryMap = {};
        this.applicationMap = new SyncApplicationMap();
        this.allOperationHistory = [];
        this.allRecordHistory = [];
        this.allRecordHistoryNewValues = [];
        this.allRecordHistoryOldValues = [];
    }
};
__decorate([
    GeneratedValue(),
    Id(),
    SequenceGenerator({ allocationSize: 100 }),
    Column({ name: 'TRANSACTION_HISTORY_LID' })
], TransactionHistory.prototype, "_localId", void 0);
__decorate([
    Column({ name: 'TRANSACTION_TYPE', nullable: false }),
    DbString()
], TransactionHistory.prototype, "transactionType", void 0);
__decorate([
    OneToMany({ mappedBy: 'transactionHistory' })
], TransactionHistory.prototype, "repositoryTransactionHistories", void 0);
__decorate([
    Transient()
], TransactionHistory.prototype, "repositoryTransactionHistoryMap", void 0);
__decorate([
    Transient()
], TransactionHistory.prototype, "applicationMap", void 0);
__decorate([
    Transient()
], TransactionHistory.prototype, "allOperationHistory", void 0);
__decorate([
    Transient()
], TransactionHistory.prototype, "allRecordHistory", void 0);
__decorate([
    Transient()
], TransactionHistory.prototype, "allRecordHistoryNewValues", void 0);
__decorate([
    Transient()
], TransactionHistory.prototype, "allRecordHistoryOldValues", void 0);
TransactionHistory = __decorate([
    Entity(),
    Table({ name: 'TRANSACTION_HISTORY' })
], TransactionHistory);
export { TransactionHistory };
//# sourceMappingURL=TransactionHistory.js.map