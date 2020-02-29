var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbAny, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let LogEntryValue = class LogEntryValue {
};
__decorate([
    Id(),
    GeneratedValue()
], LogEntryValue.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "LOG_ENTRY_ID", referencedColumnName: "ID" })
], LogEntryValue.prototype, "logEntry", void 0);
__decorate([
    DbAny()
], LogEntryValue.prototype, "value", void 0);
LogEntryValue = __decorate([
    Entity(),
    Table({ name: "LOG_ENTRY_VALUES" })
], LogEntryValue);
export { LogEntryValue };
//# sourceMappingURL=LogEntryValue.js.map