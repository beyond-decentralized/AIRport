"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const RepositoryTransactionType_1 = require("./RepositoryTransactionType");
let AbstractRepoTransHistory = class AbstractRepoTransHistory {
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
    __metadata("design:type", Number)
], AbstractRepoTransHistory.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: "REMOTE_ID" }),
    __metadata("design:type", Number)
], AbstractRepoTransHistory.prototype, "remoteId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "TRANSACTION_HISTORY_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], AbstractRepoTransHistory.prototype, "transactionHistory", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], AbstractRepoTransHistory.prototype, "repository", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" }),
    __metadata("design:type", Object)
], AbstractRepoTransHistory.prototype, "actor", void 0);
__decorate([
    air_control_1.Column({ name: "SAVE_TIMESTAMP" }),
    air_control_1.DbDate(),
    __metadata("design:type", Object)
], AbstractRepoTransHistory.prototype, "saveTimestamp", void 0);
__decorate([
    air_control_1.Column({ name: "REPOSITORY_TRANSACTION_TYPE" }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], AbstractRepoTransHistory.prototype, "repositoryTransactionType", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: air_control_1.CascadeType.ALL, mappedBy: 'repositoryTransactionHistory' }),
    __metadata("design:type", Array)
], AbstractRepoTransHistory.prototype, "operationHistory", void 0);
AbstractRepoTransHistory = __decorate([
    air_control_1.MappedSuperclass(),
    __metadata("design:paramtypes", [Object])
], AbstractRepoTransHistory);
exports.AbstractRepoTransHistory = AbstractRepoTransHistory;
//# sourceMappingURL=AbstractRepoTransHistory.js.map