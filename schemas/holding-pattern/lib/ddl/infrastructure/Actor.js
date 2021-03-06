var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, } from '@airport/tarmaq-entity';
let Actor = class Actor {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column({ name: 'ACTOR_LID' })
], Actor.prototype, "_localId", void 0);
__decorate([
    Column({ name: 'GUID', nullable: false }),
    DbString()
], Actor.prototype, "GUID", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'USER_ACCOUNT_LID',
        referencedColumnName: 'USER_ACCOUNT_LID',
        nullable: false
    })
], Actor.prototype, "userAccount", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'TERMINAL_LID',
        referencedColumnName: 'TERMINAL_LID',
        nullable: false
    })
], Actor.prototype, "terminal", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: "APPLICATION_INDEX",
        referencedColumnName: "APPLICATION_INDEX"
    })
], Actor.prototype, "application", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'CLIENT_LID',
        referencedColumnName: 'CLIENT_LID',
        nullable: true
    })
], Actor.prototype, "client", void 0);
Actor = __decorate([
    Entity()
], Actor);
export { Actor };
//# sourceMappingURL=Actor.js.map