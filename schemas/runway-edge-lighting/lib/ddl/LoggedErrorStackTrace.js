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
let LoggedErrorStackTrace = class LoggedErrorStackTrace {
};
__decorate([
    air_control_1.Id(),
    __metadata("design:type", Number)
], LoggedErrorStackTrace.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: "STACK_HASH" }),
    __metadata("design:type", String)
], LoggedErrorStackTrace.prototype, "stackHash", void 0);
LoggedErrorStackTrace = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: "LOGGED_ERROR_STACK_TRACE" })
], LoggedErrorStackTrace);
exports.LoggedErrorStackTrace = LoggedErrorStackTrace;
//# sourceMappingURL=LoggedErrorStackTrace.js.map