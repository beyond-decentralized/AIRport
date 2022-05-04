var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
let SynchronizationConflictValues = class SynchronizationConflictValues {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'SYNCHRONIZATION_CONFLICT_ID', referencedColumnName: 'ID' })
], SynchronizationConflictValues.prototype, "synchronizationConflict", void 0);
__decorate([
    Id(),
    DbNumber()
], SynchronizationConflictValues.prototype, "columnIndex", void 0);
SynchronizationConflictValues = __decorate([
    Entity(),
    Table({ name: 'SYNCHRONIZATION_CONFLICT_VALUES' })
], SynchronizationConflictValues);
export { SynchronizationConflictValues };
//# sourceMappingURL=SynchronizationConflictValues.js.map