"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let MonthlyArchiveLog = 
// TODO: partition on each node by date
class MonthlyArchiveLog {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID", nullable: false })
], MonthlyArchiveLog.prototype, "repository", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.Column({ name: "MONTH_NUMBER", nullable: false }),
    air_control_1.DbNumber()
], MonthlyArchiveLog.prototype, "monthNumber", void 0);
__decorate([
    air_control_1.Column({ name: "NUMBER_OF_CHANGES", nullable: false }),
    air_control_1.DbNumber()
], MonthlyArchiveLog.prototype, "numberOfChanges", void 0);
__decorate([
    air_control_1.Column({ name: "DAYS_WITH_CHANGES", nullable: false })
], MonthlyArchiveLog.prototype, "daysWithChanges", void 0);
MonthlyArchiveLog = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "MONTHLY_ARCHIVE_LOG" })
    // TODO: partition on each node by date
], MonthlyArchiveLog);
exports.MonthlyArchiveLog = MonthlyArchiveLog;
//# sourceMappingURL=monthlyarchivelog.js.map