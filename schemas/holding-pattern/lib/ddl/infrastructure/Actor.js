var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany } from '@airport/air-control';
let Actor = class Actor {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column({ name: 'ID' })
], Actor.prototype, "id", void 0);
__decorate([
    Column({ name: 'UU_ID', nullable: false }),
    DbString()
], Actor.prototype, "uuId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'USER_ID', referencedColumnName: 'ID',
        nullable: false
    })
], Actor.prototype, "user", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'TERMINAL_ID', referencedColumnName: 'ID',
        nullable: false
    })
], Actor.prototype, "terminal", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "SCHEMA_INDEX", referencedColumnName: "SCHEMA_INDEX" })
], Actor.prototype, "schema", void 0);
__decorate([
    OneToMany({ mappedBy: 'actor' })
], Actor.prototype, "repositoryActors", void 0);
Actor = __decorate([
    Entity()
], Actor);
export { Actor };
//# sourceMappingURL=Actor.js.map