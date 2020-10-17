var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, Entity, Id, JoinColumn, JoinColumns, ManyToOne, Table } from '@airport/air-control';
let DailyTerminalSyncLog = 
// TODO: partition on each node by date
class DailyTerminalSyncLog {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumns([
        { name: 'REPOSITORY_ID', nullable: false },
        { name: 'DATE_NUMBER', nullable: false }
    ])
], DailyTerminalSyncLog.prototype, "dailyArchiveLog", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID', nullable: false })
], DailyTerminalSyncLog.prototype, "terminal", void 0);
__decorate([
    DbNumber(),
    DbBoolean(),
    Column({ name: 'ACKNOWLEDGED', nullable: false })
], DailyTerminalSyncLog.prototype, "acknowledged", void 0);
DailyTerminalSyncLog = __decorate([
    Entity(),
    Table({ name: 'DAILY_TERMINAL_SYNC_LOG' })
    // TODO: partition on each node by date
], DailyTerminalSyncLog);
export { DailyTerminalSyncLog };
//# sourceMappingURL=DailyTerminalSyncLog.js.map