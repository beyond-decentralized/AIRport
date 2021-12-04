var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbAny, DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
/**
 * Currently, syncing databases are always SqLite dbs.  This means
 * we don't need to store types for values.  If a need arises type
 * specific FieldChange classes can always be added.  Having
 * VARCHAR and NUMBER should suffice for other db implementations.
 * NUMBER covers (dates, booleans and numbers).  Maybe REALs will
 * also be required.
 */
let RecordHistoryOldValue = class RecordHistoryOldValue {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_RECORD_HISTORY_ID",
        referencedColumnName: "ID", nullable: false })
], RecordHistoryOldValue.prototype, "recordHistory", void 0);
__decorate([
    Id(),
    Column({ name: "COLUMN_INDEX", nullable: false }),
    DbNumber()
], RecordHistoryOldValue.prototype, "columnIndex", void 0);
__decorate([
    Column({ name: "OLD_VALUE" }),
    DbAny()
], RecordHistoryOldValue.prototype, "oldValue", void 0);
RecordHistoryOldValue = __decorate([
    Entity(),
    Table({
        name: "REPOSITORY_RECORD_HISTORY_OLD_VALUES",
    })
], RecordHistoryOldValue);
export { RecordHistoryOldValue };
//# sourceMappingURL=RecordHistoryOldValue.js.map