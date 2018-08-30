"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Terminal_1 = require("../terminal/Terminal");
const DailyArchiveLog_1 = require("./DailyArchiveLog");
let DailyTerminalSyncLog = 
// TODO: partition on each node by date
class DailyTerminalSyncLog {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: 'REPOSITORY_ID', nullable: false },
        { name: 'DATE_NUMBER', nullable: false }
    ]),
    __metadata("design:type", DailyArchiveLog_1.DailyArchiveLog)
], DailyTerminalSyncLog.prototype, "dailyArchiveLog", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", Terminal_1.Terminal)
], DailyTerminalSyncLog.prototype, "terminal", void 0);
__decorate([
    air_control_1.DbNumber(),
    air_control_1.DbBoolean(),
    air_control_1.Column({ name: 'ACKNOWLEDGED', nullable: false }),
    __metadata("design:type", Boolean)
], DailyTerminalSyncLog.prototype, "acknowledged", void 0);
DailyTerminalSyncLog = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'DAILY_TERMINAL_SYNC_LOG' })
    // TODO: partition on each node by date
], DailyTerminalSyncLog);
exports.DailyTerminalSyncLog = DailyTerminalSyncLog;
//# sourceMappingURL=DailyTerminalSyncLog.js.map