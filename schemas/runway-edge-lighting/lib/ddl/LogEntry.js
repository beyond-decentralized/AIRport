"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let LogEntry = class LogEntry {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue()
], LogEntry.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "LOG_ENTRY_TYPE_ID", referencedColumnName: "ID" })
], LogEntry.prototype, "type", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: "logEntry" })
], LogEntry.prototype, "values", void 0);
LogEntry = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "LOG_ENTRY" })
], LogEntry);
exports.LogEntry = LogEntry;
//# sourceMappingURL=LogEntry.js.map