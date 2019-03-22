"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let ServerSyncLog = class ServerSyncLog {
};
__decorate([
    air_control_1.Id(),
    air_control_1.DbNumber(),
    air_control_1.GeneratedValue()
], ServerSyncLog.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "SERVER_ID", referencedColumnName: "ID", nullable: false })
], ServerSyncLog.prototype, "server", void 0);
__decorate([
    air_control_1.Column({ name: 'TYPE', nullable: false }),
    air_control_1.DbNumber()
], ServerSyncLog.prototype, "type", void 0);
__decorate([
    air_control_1.Column({ name: "START_DATETIME", nullable: false }),
    air_control_1.DbDate()
], ServerSyncLog.prototype, "startDatetime", void 0);
__decorate([
    air_control_1.Column({ name: "PROCESSED_DATETIME", nullable: false }),
    air_control_1.DbDate()
], ServerSyncLog.prototype, "endDatetime", void 0);
__decorate([
    air_control_1.Column({ name: "NUMBER_OF_CONNECTIONS", nullable: false }),
    air_control_1.DbNumber()
], ServerSyncLog.prototype, "numberOfConnections", void 0);
__decorate([
    air_control_1.Column({ name: "NUMBER_OF_SYNC_RECORDS", nullable: false }),
    air_control_1.DbNumber()
], ServerSyncLog.prototype, "numberOfRecords", void 0);
__decorate([
    air_control_1.Column({ name: "DATA_CHARS_TOTAL", nullable: false }),
    air_control_1.DbNumber()
], ServerSyncLog.prototype, "dataCharsTotal", void 0);
ServerSyncLog = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "AGT_SERVER_SYNC_LOG" })
], ServerSyncLog);
exports.ServerSyncLog = ServerSyncLog;
//# sourceMappingURL=ServerSyncLog.js.map