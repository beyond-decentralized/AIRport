var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let MissingRecord = class MissingRecord {
};
__decorate([
    Id()
], MissingRecord.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "SCHEMA_VERSION_ID", referencedColumnName: "ID" })
], MissingRecord.prototype, "schemaVersion", void 0);
__decorate([
    ManyToOne()
    // FIXME: verify that these records don't make it into serialized
    // repository ledger (and hence, that using local ids is safe)
    ,
    JoinColumn({ name: "SCHEMA_ENTITY_ID", referencedColumnName: 'ID' })
], MissingRecord.prototype, "entity", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: "REPOSITORY_ID", referencedColumnName: "ID"
    })
], MissingRecord.prototype, "repository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "ACTOR_ID", referencedColumnName: "ID" })
], MissingRecord.prototype, "actor", void 0);
__decorate([
    Column({ name: "ACTOR_RECORD_ID" }),
    DbNumber()
], MissingRecord.prototype, "actorRecordId", void 0);
__decorate([
    DbString()
], MissingRecord.prototype, "status", void 0);
MissingRecord = __decorate([
    Entity(),
    Table({ name: "MISSING_RECORDS" })
], MissingRecord);
export { MissingRecord };
//# sourceMappingURL=MissingRecord.js.map