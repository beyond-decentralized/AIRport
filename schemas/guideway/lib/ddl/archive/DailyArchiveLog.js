var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let DailyArchiveLog = 
// TODO: partition on each node by date
class DailyArchiveLog {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID", nullable: false })
], DailyArchiveLog.prototype, "repository", void 0);
__decorate([
    Id(),
    Column({ name: "DATE_NUMBER", nullable: false }),
    DbNumber()
], DailyArchiveLog.prototype, "dateNumber", void 0);
__decorate([
    Column({ name: "NUMBER_OF_CHANGES", nullable: false }),
    DbNumber()
], DailyArchiveLog.prototype, "numberOfChanges", void 0);
DailyArchiveLog = __decorate([
    Entity(),
    Table({ name: "DAILY_ARCHIVE_LOG" })
    // TODO: partition on each node by date
], DailyArchiveLog);
export { DailyArchiveLog };
//# sourceMappingURL=DailyArchiveLog.js.map