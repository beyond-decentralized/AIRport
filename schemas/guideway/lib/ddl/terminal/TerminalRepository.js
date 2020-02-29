var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
/**
 * Records all Repositories that a given terminal subscribes too.
 */
let TerminalRepository = class TerminalRepository {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "TERMINAL_ID", referencedColumnName: 'ID' })
], TerminalRepository.prototype, "terminal", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: 'ID' })
], TerminalRepository.prototype, "repository", void 0);
__decorate([
    Column({ name: 'PERMISSION', nullable: false }),
    DbNumber()
], TerminalRepository.prototype, "permission", void 0);
TerminalRepository = __decorate([
    Entity(),
    Table({ name: "AGT_TERMINAL_REPOSITORIES" })
], TerminalRepository);
export { TerminalRepository };
//# sourceMappingURL=TerminalRepository.js.map