var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-control';
/**
 *
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 *
 */
let TerminalAgt = class TerminalAgt {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'TERMINAL_ID', referencedColumnName: 'ID' })
], TerminalAgt.prototype, "terminal", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'AGT_ID', referencedColumnName: 'ID' })
], TerminalAgt.prototype, "agt", void 0);
__decorate([
    OneToMany({ mappedBy: 'terminalAgt' })
], TerminalAgt.prototype, "userTerminalAgts", void 0);
TerminalAgt = __decorate([
    Entity(),
    Table({ name: 'TERMINAL_AGTS' })
], TerminalAgt);
export { TerminalAgt };
//# sourceMappingURL=TerminalAgt.js.map