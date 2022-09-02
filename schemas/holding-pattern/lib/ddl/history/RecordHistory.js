var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table, Transient } from '@airport/tarmaq-entity';
let RecordHistory = class RecordHistory {
    constructor() {
        this.newValues = [];
        this.oldValues = [];
    }
};
__decorate([
    Id(),
    GeneratedValue(),
    SequenceGenerator({ allocationSize: 2000 }),
    Column({ name: 'RECORD_HISTORY_LID' })
], RecordHistory.prototype, "_localId", void 0);
__decorate([
    Column({ name: 'ACTOR_RECORD_ID', nullable: false }),
    DbNumber()
], RecordHistory.prototype, "_actorRecordId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'ACTOR_LID',
        referencedColumnName: 'ACTOR_LID', nullable: false
    })
], RecordHistory.prototype, "actor", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'OPERATION_HISTORY_LID',
        referencedColumnName: 'OPERATION_HISTORY_LID',
        nullable: false
    })
], RecordHistory.prototype, "operationHistory", void 0);
__decorate([
    OneToMany({ mappedBy: 'recordHistory' })
], RecordHistory.prototype, "newValues", void 0);
__decorate([
    OneToMany({ mappedBy: 'recordHistory' })
], RecordHistory.prototype, "oldValues", void 0);
__decorate([
    Transient()
], RecordHistory.prototype, "tableColumnMap", void 0);
RecordHistory = __decorate([
    Entity(),
    Table({
        name: 'REPOSITORY_RECORD_HISTORY',
        indexes: [{
                name: 'RCRD_HSTR_TO_OPRTN_HSTR_FX',
                columnList: [
                    'OPERATION_HISTORY_LID'
                ],
                unique: false
            }]
    })
], RecordHistory);
export { RecordHistory };
//# sourceMappingURL=RecordHistory.js.map