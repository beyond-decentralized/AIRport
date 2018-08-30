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
    air_control_1.Id(),
    __metadata("design:type", Number)
], OperationHistory.prototype, "id", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: 'REPOSITORY_TRANSACTION_HISTORY_ID', referencedColumnName: 'ID',
        nullable: false
    }),
    __metadata("design:type", Object)
], OperationHistory.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    air_control_1.Column({ name: 'ORDER_NUMBER', nullable: false }),
    __metadata("design:type", Number)
], OperationHistory.prototype, "orderNumber", void 0);
__decorate([
    air_control_1.Column({ name: 'CHANGE_TYPE', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], OperationHistory.prototype, "changeType", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", Object)
], OperationHistory.prototype, "schemaVersion", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: 'SCHEMA_VERSION_ID', nullable: false },
        { name: 'ENTITY_INDEX', referencedColumnName: 'INDEX', nullable: false }
    ]),
    __metadata("design:type", Object)
], OperationHistory.prototype, "entity", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'operationHistory' }),
    __metadata("design:type", Array)
], OperationHistory.prototype, "recordHistory", void 0);
OperationHistory = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'REPOSITORY_OPERATION_HISTORY' })
], OperationHistory);
exports.OperationHistory = OperationHistory;
//# sourceMappingURL=OperationHistory.js.map