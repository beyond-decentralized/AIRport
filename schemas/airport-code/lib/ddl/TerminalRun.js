var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, GeneratedValue, Id, Table } from '@airport/air-control';
/**
 * A record of the Terminal running (being up at a given point in time)
 */
let TerminalRun = class TerminalRun {
};
__decorate([
    Id(),
    GeneratedValue()
], TerminalRun.prototype, "id", void 0);
__decorate([
    Column({ name: 'CREATE_TIMESTAMP', nullable: false })
], TerminalRun.prototype, "createTimestamp", void 0);
__decorate([
    Column({ name: 'RANDOM_NUMBER', nullable: false })
], TerminalRun.prototype, "randomNumber", void 0);
TerminalRun = __decorate([
    Entity(),
    Table({ name: 'TERMINAL_RUNS' })
], TerminalRun);
export { TerminalRun };
//# sourceMappingURL=TerminalRun.js.map