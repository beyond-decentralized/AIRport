var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-traffic-control';
let UserTerminal = class UserTerminal {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'USER_LID',
        referencedColumnName: 'USER_LID'
    })
], UserTerminal.prototype, "user", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'TERMINAL_LID',
        referencedColumnName: 'TERMINAL_LID'
    })
], UserTerminal.prototype, "terminal", void 0);
UserTerminal = __decorate([
    Entity(),
    Table({ name: 'USER_TERMINAL' })
], UserTerminal);
export { UserTerminal };
//# sourceMappingURL=UserTerminal.js.map