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
const ground_control_1 = require("@airport/ground-control");
let TransactionHistory = class TransactionHistory {
    constructor() {
        this.repositoryTransactionHistories = [];
        this.repoTransHistoryMap = {};
        this.schemaMap = new ground_control_1.SyncSchemaMap();
        this.allOperationHistory = [];
        this.allRecordHistory = [];
        this.allRecordHistoryNewValues = [];
        this.allRecordHistoryOldValues = [];
        this.numberOfOperations = 0;
    }
};
__decorate([
    air_control_1.GeneratedValue(),
    air_control_1.Id(),
    air_control_1.SequenceGenerator({ allocationSize: 100 }),
    __metadata("design:type", Number)
], TransactionHistory.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'TRANSACTION_TYPE' }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], TransactionHistory.prototype, "transactionType", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'repoTransHistory' }),
    __metadata("design:type", Array)
], TransactionHistory.prototype, "repositoryTransactionHistories", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], TransactionHistory.prototype, "repoTransHistoryMap", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", ground_control_1.SyncSchemaMap)
], TransactionHistory.prototype, "schemaMap", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Array)
], TransactionHistory.prototype, "allOperationHistory", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Array)
], TransactionHistory.prototype, "allRecordHistory", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Array)
], TransactionHistory.prototype, "allRecordHistoryNewValues", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Array)
], TransactionHistory.prototype, "allRecordHistoryOldValues", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Number)
], TransactionHistory.prototype, "numberOfOperations", void 0);
TransactionHistory = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'TRANSACTION_HISTORY' })
], TransactionHistory);
exports.TransactionHistory = TransactionHistory;
//# sourceMappingURL=TransactionHistory.js.map