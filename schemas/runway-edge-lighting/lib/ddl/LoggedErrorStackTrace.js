var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, Id, Table } from "@airport/air-control";
let LoggedErrorStackTrace = class LoggedErrorStackTrace {
};
__decorate([
    Id()
], LoggedErrorStackTrace.prototype, "id", void 0);
__decorate([
    Column({ name: "STACK_HASH" })
], LoggedErrorStackTrace.prototype, "stackHash", void 0);
LoggedErrorStackTrace = __decorate([
    Entity(),
    Table({ name: "LOGGED_ERROR_STACK_TRACE" })
], LoggedErrorStackTrace);
export { LoggedErrorStackTrace };
//# sourceMappingURL=LoggedErrorStackTrace.js.map