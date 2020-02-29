var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbDate, DbNumber, Entity, Id, Table } from "@airport/air-control";
let MonthlySyncLog = 
// TODO: split between nodes by databaseId
class MonthlySyncLog {
};
__decorate([
    Id(),
    Column({ name: "DATABASE_ID", nullable: false }),
    DbNumber()
], MonthlySyncLog.prototype, "databaseId", void 0);
__decorate([
    Id(),
    Column({ name: "DATE", nullable: false }),
    DbDate()
], MonthlySyncLog.prototype, "month", void 0);
__decorate([
    Id(),
    Column({ name: "REPOSITORY_ID", nullable: false }),
    DbNumber()
], MonthlySyncLog.prototype, "repositoryId", void 0);
__decorate([
    Column({ name: "SYNCED", nullable: false }),
    DbBoolean()
], MonthlySyncLog.prototype, "synced", void 0);
MonthlySyncLog = __decorate([
    Entity(),
    Table({ name: "MONTHLY_SYNC_LOG" })
    // TODO: split between nodes by databaseId
], MonthlySyncLog);
export { MonthlySyncLog };
//# sourceMappingURL=MonthlySyncLog.js.map