var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
/**
 *
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 *
 */
let Terminal = class Terminal {
    constructor() {
        this.isLocal = false;
        // @OneToMany({ mappedBy: 'terminal' })
        // terminalAgts: TerminalAgt[]
        // @OneToMany({ mappedBy: 'terminal' })
        // userTerminal: UserTerminal[]
        // @OneToMany({ mappedBy: 'terminal' })
        // userTerminalAgt: UserTerminalAgt[]
    }
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], Terminal.prototype, "id", void 0);
__decorate([
    Column({ name: 'UUID', nullable: false }),
    DbString()
], Terminal.prototype, "uuId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID' })
], Terminal.prototype, "owner", void 0);
__decorate([
    Column({ name: 'IS_LOCAL', nullable: false }),
    DbBoolean()
], Terminal.prototype, "isLocal", void 0);
Terminal = __decorate([
    Entity(),
    Table({
        name: 'TERMINAL',
        indexes: (t) => [{
                property: t.uuId,
                unique: true
            }]
    })
], Terminal);
export { Terminal };
//# sourceMappingURL=Terminal.js.map