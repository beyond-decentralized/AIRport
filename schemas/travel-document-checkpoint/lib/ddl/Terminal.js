var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany } from '@airport/air-control';
let Terminal = class Terminal {
    constructor() {
        this.isLocal = false;
    }
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], Terminal.prototype, "id", void 0);
__decorate([
    DbString()
], Terminal.prototype, "name", void 0);
__decorate([
    Column({ name: 'SECOND_ID' }),
    DbNumber()
], Terminal.prototype, "secondId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID' })
], Terminal.prototype, "owner", void 0);
__decorate([
    Column({ name: 'IS_LOCAL' }),
    DbBoolean()
], Terminal.prototype, "isLocal", void 0);
__decorate([
    OneToMany({ mappedBy: 'terminal' })
], Terminal.prototype, "terminalAgts", void 0);
__decorate([
    OneToMany({ mappedBy: 'terminal' })
], Terminal.prototype, "userTerminal", void 0);
__decorate([
    OneToMany({ mappedBy: 'terminal' })
], Terminal.prototype, "userTerminalAgt", void 0);
Terminal = __decorate([
    Entity()
], Terminal);
export { Terminal };
//# sourceMappingURL=Terminal.js.map