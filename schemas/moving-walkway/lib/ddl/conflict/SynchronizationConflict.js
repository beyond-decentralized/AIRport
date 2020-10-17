var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-control";
import { CascadeType, } from "@airport/ground-control";
let SynchronizationConflict = class SynchronizationConflict {
};
__decorate([
    GeneratedValue(),
    Id(),
    DbNumber()
], SynchronizationConflict.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" })
], SynchronizationConflict.prototype, "repository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "OVERWRITTEN_RECORD_HISTORY_ID", referencedColumnName: "ID" })
], SynchronizationConflict.prototype, "overwrittenRecordHistory", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "OVERWRITING_RECORD_HISTORY_ID", referencedColumnName: "ID" })
], SynchronizationConflict.prototype, "overwritingRecordHistory", void 0);
__decorate([
    OneToMany({ cascade: CascadeType.ALL, mappedBy: "SYNCHRONIZATION_CONFLICT_ID" })
], SynchronizationConflict.prototype, "values", void 0);
__decorate([
    DbNumber()
], SynchronizationConflict.prototype, "type", void 0);
SynchronizationConflict = __decorate([
    Entity(),
    Table({ name: "SYNCHRONIZATION_CONFLICT" })
], SynchronizationConflict);
export { SynchronizationConflict };
//# sourceMappingURL=SynchronizationConflict.js.map