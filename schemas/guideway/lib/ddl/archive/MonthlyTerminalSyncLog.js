var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbString, Entity, Id, JoinColumn, JoinColumns, ManyToOne, Table } from "@airport/air-control";
let MonthlyTerminalSyncLog = 
// TODO: partition on each node by date
class MonthlyTerminalSyncLog {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumns([
        { name: "REPOSITORY_ID", nullable: false },
        { name: "MONTH_NUMBER", nullable: false }
    ])
], MonthlyTerminalSyncLog.prototype, "monthlyArchiveLog", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "TERMINAL_ID", referencedColumnName: "ID", nullable: false })
], MonthlyTerminalSyncLog.prototype, "terminal", void 0);
__decorate([
    Column({ name: "ALL_ACKNOWLEDGED", nullable: false }),
    DbBoolean()
], MonthlyTerminalSyncLog.prototype, "allAcknowledged", void 0);
__decorate([
    Column({ name: "DAILY_SYNC_STATUSES", nullable: false }),
    DbString()
], MonthlyTerminalSyncLog.prototype, "dailySyncStatuses", void 0);
MonthlyTerminalSyncLog = __decorate([
    Entity(),
    Table({ name: "MONTHLY_TERMINAL_SYNC_LOG" })
    // TODO: partition on each node by date
], MonthlyTerminalSyncLog);
export { MonthlyTerminalSyncLog };
//# sourceMappingURL=MonthlyTerminalSyncLog.js.map