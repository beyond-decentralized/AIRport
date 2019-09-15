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
/**
 * Marks a group of mutation history changes.
 */
let OperationHistory = class OperationHistory {
    /**
     * Marks a group of mutation history changes.
     */
    constructor() {
        this.recordHistory = [];
    }
};
__decorate([
    air_control_1.GeneratedValue(),
    air_control_1.SequenceGenerator({ allocationSize: 600 }),
    air_control_1.Id()
], OperationHistory.prototype, "id", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: 'REPOSITORY_TRANSACTION_HISTORY_ID', referencedColumnName: 'ID',
        nullable: false
    })
], OperationHistory.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    air_control_1.Column({ name: 'ORDER_NUMBER', nullable: false })
], OperationHistory.prototype, "orderNumber", void 0);
__decorate([
    air_control_1.Column({ name: 'CHANGE_TYPE', nullable: false }),
    air_control_1.DbNumber()
], OperationHistory.prototype, "changeType", void 0);
__decorate([
    air_control_1.Column({ name: 'SYSTEM_WIDE_OPERATION_ID', nullable: false })
], OperationHistory.prototype, "systemWideOperationId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'ENTITY_ID', referencedColumnName: 'ID', nullable: false })
], OperationHistory.prototype, "entity", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'operationHistory' })
], OperationHistory.prototype, "recordHistory", void 0);
OperationHistory = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'REPOSITORY_OPERATION_HISTORY' })
], OperationHistory);
exports.OperationHistory = OperationHistory;
//# sourceMappingURL=OperationHistory.js.map