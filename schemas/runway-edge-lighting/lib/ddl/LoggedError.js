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
const LoggedErrorStackTrace_1 = require("./LoggedErrorStackTrace");
let LoggedError = class LoggedError {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "LOG_ENTRY_ID", referencedColumnName: "ID" }),
    __metadata("design:type", LogEntry_1.LogEntry)
], LoggedError.prototype, "logEntry", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: "LOGGED_ERROR_STACK_TRACE_ID", referencedColumnName: "ID" }),
    __metadata("design:type", LoggedErrorStackTrace_1.LoggedErrorStackTrace)
], LoggedError.prototype, "stackTrace", void 0);
LoggedError = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "LOGGED_ERROR" })
], LoggedError);
exports.LoggedError = LoggedError;
//# sourceMappingURL=LoggedError.js.map