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
let RecordHistory = class RecordHistory {
    constructor() {
        this.newValues = [];
        this.oldValues = [];
    }
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    air_control_1.SequenceGenerator({ allocationSize: 2000 }),
    __metadata("design:type", Number)
], RecordHistory.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'ACTOR_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", Object)
], RecordHistory.prototype, "actor", void 0);
__decorate([
    air_control_1.Column({ name: 'ACTOR_RECORD_ID', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], RecordHistory.prototype, "actorRecordId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'REPOSITORY_OPERATION_HISTORY_ID', referencedColumnName: 'ID',
        nullable: false }),
    __metadata("design:type", Object)
], RecordHistory.prototype, "operationHistory", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'recordHistory' }),
    __metadata("design:type", Array)
], RecordHistory.prototype, "newValues", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'recordHistory' }),
    __metadata("design:type", Array)
], RecordHistory.prototype, "oldValues", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", ground_control_1.SyncColumnMap)
], RecordHistory.prototype, "tableColumnMap", void 0);
RecordHistory = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'REPOSITORY_RECORD_HISTORY',
        indexes: [{
                name: 'RCRD_HSTR_TO_OPRTN_HSTR_FX',
                columnList: [
                    'REPOSITORY_OPERATION_HISTORY_ID'
                ],
                unique: false
            }]
    })
], RecordHistory);
exports.RecordHistory = RecordHistory;
//# sourceMappingURL=RecordHistory.js.map