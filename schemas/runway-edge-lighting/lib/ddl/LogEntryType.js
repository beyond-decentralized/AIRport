var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-control";
let LogEntryType = class LogEntryType {
};
__decorate([
    Id(),
    GeneratedValue()
], LogEntryType.prototype, "id", void 0);
__decorate([
    DbNumber()
], LogEntryType.prototype, "level", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "APPLICATION_PACKAGE_ID", referencedColumnName: "ID" })
], LogEntryType.prototype, "applicationPackage", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "PACKAGED_UNIT_ID", referencedColumnName: "ID" })
], LogEntryType.prototype, "packagedUnit", void 0);
__decorate([
    OneToMany({ mappedBy: "logEntryType" })
], LogEntryType.prototype, "logEntries", void 0);
LogEntryType = __decorate([
    Entity(),
    Table({ name: "LOG_ENTRIES" })
], LogEntryType);
export { LogEntryType };
//# sourceMappingURL=LogEntryType.js.map