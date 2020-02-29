var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbString, Entity, Id, JoinColumn, JoinColumns, ManyToOne, Table } from "@airport/air-control";
let DailyArchive = class DailyArchive {
};
__decorate([
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" })
], DailyArchive.prototype, "repository", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumns([
        { name: "REPOSITORY_ID" },
        { name: "DATE_NUMBER" }
    ])
], DailyArchive.prototype, "dailyArchiveLog", void 0);
__decorate([
    Column({ name: "REPOSITORY_DATA" }),
    DbString()
], DailyArchive.prototype, "repositoryData", void 0);
DailyArchive = __decorate([
    Entity(),
    Table({ name: "DAILY_ARCHIVES" })
], DailyArchive);
export { DailyArchive };
//# sourceMappingURL=DailyArchive.js.map