"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let DailyArchive = class DailyArchive {
};
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" })
], DailyArchive.prototype, "repository", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "REPOSITORY_ID" },
        { name: "DATE_NUMBER" }
    ])
], DailyArchive.prototype, "dailyArchiveLog", void 0);
__decorate([
    air_control_1.Column({ name: "REPOSITORY_DATA" }),
    air_control_1.DbString()
], DailyArchive.prototype, "repositoryData", void 0);
DailyArchive = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "DAILY_ARCHIVES" })
], DailyArchive);
exports.DailyArchive = DailyArchive;
//# sourceMappingURL=DailyArchive.js.map