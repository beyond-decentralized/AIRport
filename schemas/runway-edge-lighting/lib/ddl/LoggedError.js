var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let LoggedError = class LoggedError {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "LOG_ENTRY_ID", referencedColumnName: "ID" })
], LoggedError.prototype, "logEntry", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "LOGGED_ERROR_STACK_TRACE_ID", referencedColumnName: "ID" })
], LoggedError.prototype, "stackTrace", void 0);
LoggedError = __decorate([
    Entity(),
    Table({ name: "LOGGED_ERROR" })
], LoggedError);
export { LoggedError };
//# sourceMappingURL=LoggedError.js.map