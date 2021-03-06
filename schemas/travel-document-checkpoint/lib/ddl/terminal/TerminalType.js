var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/tarmaq-entity';
let TerminalType = class TerminalType {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'TERMINAL_LID',
        referencedColumnName: 'TERMINAL_LID'
    })
], TerminalType.prototype, "terminal", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'TYPE_ID',
        referencedColumnName: 'TYPE_ID'
    })
], TerminalType.prototype, "type", void 0);
TerminalType = __decorate([
    Entity(),
    Table({
        name: 'TERMINAL_TYPES'
    })
], TerminalType);
export { TerminalType };
//# sourceMappingURL=TerminalType.js.map