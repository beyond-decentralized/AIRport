var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table, } from '@airport/air-control';
import { RepositoryTransactionType } from './RepositoryTransactionType';
let RepositoryTransactionHistory = class RepositoryTransactionHistory {
    constructor(data) {
        this.repositoryTransactionType = RepositoryTransactionType.LOCAL;
        this.operationHistory = [];
        if (!data) {
            return;
        }
        this.id = data.id;
        this.transactionHistory = data.transactionHistory;
        this.repository = data.repository;
        this.actor = data.actor;
        this.saveTimestamp = data.saveTimestamp;
        this.operationHistory = data.operationHistory;
    }
};
__decorate([
    GeneratedValue(),
    Id(),
    SequenceGenerator({ allocationSize: 200 })
], RepositoryTransactionHistory.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'TRANSACTION_HISTORY_ID',
        referencedColumnName: 'ID', nullable: false
    })
], RepositoryTransactionHistory.prototype, "transactionHistory", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_ID',
        referencedColumnName: 'ID', nullable: false
    })
], RepositoryTransactionHistory.prototype, "repository", void 0);
__decorate([
    OneToMany({ mappedBy: 'repositoryTransactionHistory' })
], RepositoryTransactionHistory.prototype, "changedRepositoryActors", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ACTOR_ID', referencedColumnName: 'ID',
        nullable: false
    })
], RepositoryTransactionHistory.prototype, "actor", void 0);
__decorate([
    Column({ name: 'SAVE_TIMESTAMP', nullable: false })
], RepositoryTransactionHistory.prototype, "saveTimestamp", void 0);
__decorate([
    Column({ name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false }),
    DbString()
], RepositoryTransactionHistory.prototype, "repositoryTransactionType", void 0);
__decorate([
    Column({
        name: 'BLOCK_ID'
    })
], RepositoryTransactionHistory.prototype, "blockId", void 0);
__decorate([
    Column({
        name: 'SYNCED'
    })
], RepositoryTransactionHistory.prototype, "synced", void 0);
__decorate([
    OneToMany({ mappedBy: 'repositoryTransactionHistory' })
], RepositoryTransactionHistory.prototype, "operationHistory", void 0);
RepositoryTransactionHistory = __decorate([
    Entity(),
    Table({ name: 'REPOSITORY_TRANSACTION_HISTORY' })
], RepositoryTransactionHistory);
export { RepositoryTransactionHistory };
//# sourceMappingURL=RepositoryTransactionHistory.js.map