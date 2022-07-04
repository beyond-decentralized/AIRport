var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table, } from '@airport/air-traffic-control';
import { RepositoryTransactionType } from './RepositoryTransactionType';
let RepositoryTransactionHistory = class RepositoryTransactionHistory {
    constructor(data) {
        this.repositoryTransactionType = RepositoryTransactionType.LOCAL;
        this.operationHistory = [];
        if (!data) {
            return;
        }
        this._localId = data._localId;
        this.transactionHistory = data.transactionHistory;
        this.repository = data.repository;
        this.saveTimestamp = data.saveTimestamp;
        this.operationHistory = data.operationHistory;
    }
};
__decorate([
    GeneratedValue(),
    Id(),
    SequenceGenerator({ allocationSize: 200 }),
    Column({ name: 'REPOSITORY_TRANSACTION_HISTORY_LID' })
], RepositoryTransactionHistory.prototype, "_localId", void 0);
__decorate([
    Column({ name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false }),
    DbString()
], RepositoryTransactionHistory.prototype, "repositoryTransactionType", void 0);
__decorate([
    Column({ name: 'SAVE_TIMESTAMP', nullable: false }),
    DbNumber()
], RepositoryTransactionHistory.prototype, "saveTimestamp", void 0);
__decorate([
    Column({ name: 'SYNC_TIMESTAMP' }),
    DbNumber()
], RepositoryTransactionHistory.prototype, "syncTimestamp", void 0);
__decorate([
    Column({ name: "GUID", nullable: false }),
    DbString()
], RepositoryTransactionHistory.prototype, "GUID", void 0);
__decorate([
    Column({ name: "IS_REPOSITORY_CREATION", nullable: false }),
    DbBoolean()
], RepositoryTransactionHistory.prototype, "isRepositoryCreation", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID', nullable: false
    })
], RepositoryTransactionHistory.prototype, "repository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'TRANSACTION_HISTORY_LID',
        referencedColumnName: 'TRANSACTION_HISTORY_LID', nullable: false
    })
], RepositoryTransactionHistory.prototype, "transactionHistory", void 0);
__decorate([
    OneToMany({ mappedBy: 'repositoryTransactionHistory' })
], RepositoryTransactionHistory.prototype, "operationHistory", void 0);
RepositoryTransactionHistory = __decorate([
    Entity(),
    Table({ name: 'REPOSITORY_TRANSACTION_HISTORY' })
], RepositoryTransactionHistory);
export { RepositoryTransactionHistory };
//# sourceMappingURL=RepositoryTransactionHistory.js.map