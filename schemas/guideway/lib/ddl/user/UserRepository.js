var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
let UserRepository = class UserRepository {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'REPOSITORY_ID', referencedColumnName: 'ID' })
], UserRepository.prototype, "repository", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'USER_ID', referencedColumnName: 'ID' })
], UserRepository.prototype, "user", void 0);
__decorate([
    Column({ name: 'PERMISSION', nullable: false }),
    DbNumber()
], UserRepository.prototype, "permission", void 0);
UserRepository = __decorate([
    Entity(),
    Table({ name: "AGT_USER_REPOSITORIES" })
], UserRepository);
export { UserRepository };
//# sourceMappingURL=UserRepository.js.map