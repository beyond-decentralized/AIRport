var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
/**
 * Used to temporarily store updates during application remotely synced updates
 * to the local terminal.  Values are deleted right after the remote sync updates
 * are applied.
 */
let RecordUpdateStage = class RecordUpdateStage {
};
__decorate([
    Id(),
    GeneratedValue()
], RecordUpdateStage.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID' })
], RecordUpdateStage.prototype, "schemaVersion", void 0);
__decorate([
    ManyToOne()
    // FIXME: verify that these records don't make it into serialized
    // repository ledger (and hence, that using local ids is safe)
    ,
    JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID' })
], RecordUpdateStage.prototype, "entity", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'REPOSITORY_ID', referencedColumnName: 'ID' })
], RecordUpdateStage.prototype, "repository", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'ACTOR_ID', referencedColumnName: 'ID' })
], RecordUpdateStage.prototype, "actor", void 0);
__decorate([
    Column({ name: 'ACTOR_RECORD_ID' }),
    DbNumber()
], RecordUpdateStage.prototype, "actorRecordId", void 0);
__decorate([
    ManyToOne()
    // FIXME: verify that these records don't make it into serialized
    // repository ledger (and hence, that using local ids is safe)
    ,
    JoinColumn({ name: 'SCHEMA_COLUMN_ID', referencedColumnName: 'ID' })
], RecordUpdateStage.prototype, "column", void 0);
__decorate([
    Column({ name: 'UPDATED_VALUE' })
], RecordUpdateStage.prototype, "updatedValue", void 0);
RecordUpdateStage = __decorate([
    Entity(),
    Table({ name: 'RECORD_UPDATE_STAGE' })
], RecordUpdateStage);
export { RecordUpdateStage };
//# sourceMappingURL=RecordUpdateStage.js.map