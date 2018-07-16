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
const LogEntry_1 = require("./LogEntry");
let LogEntryValue = class LogEntryValue {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    __metadata("design:type", Number)
], LogEntryValue.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "LOG_ENTRY_ID", referencedColumnName: "ID" }),
    __metadata("design:type", LogEntry_1.LogEntry)
], LogEntryValue.prototype, "logEntry", void 0);
__decorate([
    air_control_1.DbAny(),
    __metadata("design:type", Object)
], LogEntryValue.prototype, "value", void 0);
LogEntryValue = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "LOG_ENTRY_VALUES" })
], LogEntryValue);
exports.LogEntryValue = LogEntryValue;
//# sourceMappingURL=LogEntryValue.js.map