var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbDate, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let ServerSyncLog = class ServerSyncLog {
};
__decorate([
    Id(),
    DbNumber(),
    GeneratedValue()
], ServerSyncLog.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "SERVER_ID", referencedColumnName: "ID", nullable: false })
], ServerSyncLog.prototype, "server", void 0);
__decorate([
    Column({ name: 'TYPE', nullable: false }),
    DbString()
], ServerSyncLog.prototype, "type", void 0);
__decorate([
    Column({ name: "START_DATETIME", nullable: false }),
    DbDate()
], ServerSyncLog.prototype, "startDatetime", void 0);
__decorate([
    Column({ name: "PROCESSED_DATETIME", nullable: false }),
    DbDate()
], ServerSyncLog.prototype, "endDatetime", void 0);
__decorate([
    Column({ name: "NUMBER_OF_CONNECTIONS", nullable: false }),
    DbNumber()
], ServerSyncLog.prototype, "numberOfConnections", void 0);
__decorate([
    Column({ name: "NUMBER_OF_SYNC_RECORDS", nullable: false }),
    DbNumber()
], ServerSyncLog.prototype, "numberOfRecords", void 0);
__decorate([
    Column({ name: "DATA_CHARS_TOTAL", nullable: false }),
    DbNumber()
], ServerSyncLog.prototype, "dataCharsTotal", void 0);
ServerSyncLog = __decorate([
    Entity(),
    Table({ name: "AGT_SERVER_SYNC_LOG" })
], ServerSyncLog);
export { ServerSyncLog };
//# sourceMappingURL=ServerSyncLog.js.map