"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let MonthlyTerminalSyncLog = 
// TODO: partition on each node by date
class MonthlyTerminalSyncLog {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "REPOSITORY_ID", nullable: false },
        { name: "MONTH_NUMBER", nullable: false }
    ])
], MonthlyTerminalSyncLog.prototype, "monthlyArchiveLog", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "TERMINAL_ID", referencedColumnName: "ID", nullable: false })
], MonthlyTerminalSyncLog.prototype, "terminal", void 0);
__decorate([
    air_control_1.Column({ name: "ALL_ACKNOWLEDGED", nullable: false }),
    air_control_1.DbBoolean()
], MonthlyTerminalSyncLog.prototype, "allAcknowledged", void 0);
__decorate([
    air_control_1.Column({ name: "DAILY_SYNC_STATUSES", nullable: false }),
    air_control_1.DbString()
], MonthlyTerminalSyncLog.prototype, "dailySyncStatuses", void 0);
MonthlyTerminalSyncLog = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "MONTHLY_TERMINAL_SYNC_LOG" })
    // TODO: partition on each node by date
], MonthlyTerminalSyncLog);
exports.MonthlyTerminalSyncLog = MonthlyTerminalSyncLog;
//# sourceMappingURL=MonthlyTerminalSyncLog.js.map