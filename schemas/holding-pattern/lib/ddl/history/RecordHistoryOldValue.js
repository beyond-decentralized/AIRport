"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
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
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_RECORD_HISTORY_ID",
        referencedColumnName: "ID", nullable: false })
], RecordHistoryOldValue.prototype, "recordHistory", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "COLUMN_INDEX", nullable: false }),
    air_control_1.DbNumber()
], RecordHistoryOldValue.prototype, "columnIndex", void 0);
__decorate([
    air_control_1.Column({ name: "OLD_VALUE" }),
    air_control_1.DbAny()
], RecordHistoryOldValue.prototype, "oldValue", void 0);
RecordHistoryOldValue = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: "REPOSITORY_RECORD_HISTORY_OLD_VALUES",
        primaryKey: [
            "REPOSITORY_RECORD_HISTORY_ID",
            "COLUMN_INDEX"
        ]
    })
], RecordHistoryOldValue);
exports.RecordHistoryOldValue = RecordHistoryOldValue;
//# sourceMappingURL=RecordHistoryOldValue.js.map