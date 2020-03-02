"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const RepositoryTransactionType_1 = require("./RepositoryTransactionType");
let RepositoryTransactionHistory = class RepositoryTransactionHistory {
    constructor(data) {
        this.repositoryTransactionType = RepositoryTransactionType_1.RepositoryTransactionType.LOCAL;
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
    air_control_1.GeneratedValue(),
    air_control_1.Id(),
    air_control_1.SequenceGenerator({ allocationSize: 200 })
], RepositoryTransactionHistory.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'REMOTE_ID', nullable: false })
], RepositoryTransactionHistory.prototype, "remoteId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: 'TRANSACTION_HISTORY_ID',
        referencedColumnName: 'ID', nullable: false
    })
], RepositoryTransactionHistory.prototype, "transactionHistory", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: 'REPOSITORY_ID',
        referencedColumnName: 'ID', nullable: false
    })
], RepositoryTransactionHistory.prototype, "repository", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'repositoryTransactionHistory' })
], RepositoryTransactionHistory.prototype, "changedRepositoryActors", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: 'ACTOR_ID', referencedColumnName: 'ID',
        nullable: false
    })
], RepositoryTransactionHistory.prototype, "actor", void 0);
__decorate([
    air_control_1.Column({ name: 'SAVE_TIMESTAMP', nullable: false })
], RepositoryTransactionHistory.prototype, "saveTimestamp", void 0);
__decorate([
    air_control_1.Column({ name: 'REPOSITORY_TRANSACTION_TYPE', nullable: false }),
    air_control_1.DbNumber()
], RepositoryTransactionHistory.prototype, "repositoryTransactionType", void 0);
__decorate([
    air_control_1.Column({
        name: 'REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID',
        nullable: false
    })
], RepositoryTransactionHistory.prototype, "blockId", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'repositoryTransactionHistory' })
], RepositoryTransactionHistory.prototype, "operationHistory", void 0);
RepositoryTransactionHistory = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'REPOSITORY_TRANSACTION_HISTORY' })
], RepositoryTransactionHistory);
exports.RepositoryTransactionHistory = RepositoryTransactionHistory;
//# sourceMappingURL=RepositoryTransactionHistory.js.map