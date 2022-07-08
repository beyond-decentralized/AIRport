var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-traffic-control';
let SynchronizationConflict = class SynchronizationConflict {
};
__decorate([
    GeneratedValue(),
    Id(),
    DbNumber(),
    Column({ name: 'SYNCHRONIZATION_CONFLICT_LID' })
], SynchronizationConflict.prototype, "_localId", void 0);
__decorate([
    DbString()
], SynchronizationConflict.prototype, "type", void 0);
__decorate([
    DbBoolean()
], SynchronizationConflict.prototype, "acknowledged", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
], SynchronizationConflict.prototype, "repository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'OVERWRITTEN_RECORD_HISTORY_LID',
        referencedColumnName: 'RECORD_HISTORY_LID'
    })
], SynchronizationConflict.prototype, "overwrittenRecordHistory", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'OVERWRITING_RECORD_HISTORY_LID',
        referencedColumnName: 'RECORD_HISTORY_LID'
    })
], SynchronizationConflict.prototype, "overwritingRecordHistory", void 0);
__decorate([
    OneToMany({ mappedBy: 'synchronizationConflict' })
], SynchronizationConflict.prototype, "values", void 0);
SynchronizationConflict = __decorate([
    Entity(),
    Table({ name: 'SYNCHRONIZATION_CONFLICT' })
], SynchronizationConflict);
export { SynchronizationConflict };
//# sourceMappingURL=SynchronizationConflict.js.map