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
const territory_1 = require("@airport/territory");
const LogLevel_1 = require("./LogLevel");
let LogEntryType = class LogEntryType {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    __metadata("design:type", Number)
], LogEntryType.prototype, "id", void 0);
__decorate([
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], LogEntryType.prototype, "level", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "APPLICATION_PACKAGE_ID", referencedColumnName: "ID" }),
    __metadata("design:type", territory_1.ApplicationPackage)
], LogEntryType.prototype, "applicationPackage", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "PACKAGED_UNIT_ID", referencedColumnName: "ID" }),
    __metadata("design:type", territory_1.PackagedUnit)
], LogEntryType.prototype, "packagedUnit", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: "logEntryType" }),
    __metadata("design:type", Array)
], LogEntryType.prototype, "logEntries", void 0);
LogEntryType = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "LOG_ENTRIES" })
], LogEntryType);
exports.LogEntryType = LogEntryType;
//# sourceMappingURL=LogEntryType.js.map