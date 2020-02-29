var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbString, Entity, GeneratedValue, Id, OneToMany, Table } from "@airport/air-control";
let User = class User {
};
__decorate([
    Id(),
    GeneratedValue()
], User.prototype, "id", void 0);
__decorate([
    Column({ name: 'HASH', nullable: false }),
    DbString()
], User.prototype, "hash", void 0);
__decorate([
    Column({ name: 'EMAIL', nullable: false })
], User.prototype, "email", void 0);
__decorate([
    Column({ name: "IS_INVITATION", nullable: false }),
    DbBoolean()
], User.prototype, "isInvitation", void 0);
__decorate([
    OneToMany()
], User.prototype, "securityAnswers", void 0);
__decorate([
    OneToMany()
], User.prototype, "userRepositories", void 0);
__decorate([
    OneToMany()
], User.prototype, "terminals", void 0);
__decorate([
    OneToMany()
], User.prototype, "repositoryTransactionBlocks", void 0);
User = __decorate([
    Entity(),
    Table({ name: "AGT_USERS" })
], User);
export { User };
//# sourceMappingURL=User.js.map