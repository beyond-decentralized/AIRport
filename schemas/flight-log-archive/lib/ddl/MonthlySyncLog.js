"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let MonthlySyncLog = 
// TODO: split between nodes by databaseId
class MonthlySyncLog {
};
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "DATABASE_ID", nullable: false }),
    air_control_1.DbNumber()
], MonthlySyncLog.prototype, "databaseId", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "DATE", nullable: false }),
    air_control_1.DbDate()
], MonthlySyncLog.prototype, "month", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "REPOSITORY_ID", nullable: false }),
    air_control_1.DbNumber()
], MonthlySyncLog.prototype, "repositoryId", void 0);
__decorate([
    air_control_1.Column({ name: "SYNCED", nullable: false }),
    air_control_1.DbBoolean()
], MonthlySyncLog.prototype, "synced", void 0);
MonthlySyncLog = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "MONTHLY_SYNC_LOG" })
    // TODO: split between nodes by databaseId
], MonthlySyncLog);
exports.MonthlySyncLog = MonthlySyncLog;
//# sourceMappingURL=MonthlySyncLog.js.map