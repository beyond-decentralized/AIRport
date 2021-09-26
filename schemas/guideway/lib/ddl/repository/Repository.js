var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbDate, DbNumber, DbString, Entity, GeneratedValue, Id, OneToMany, Table } from '@airport/air-control';
let Repository = class Repository {
};
__decorate([
    Id(),
    DbNumber(),
    GeneratedValue()
], Repository.prototype, "id", void 0);
__decorate([
    Column({ name: 'LAST_UPDATE_DATETIME', nullable: false }),
    DbDate()
], Repository.prototype, "lastUpdateTime", void 0);
__decorate([
    DbString(),
    Column({ name: 'NAME', nullable: false })
], Repository.prototype, "name", void 0);
__decorate([
    Column({ name: 'STATUS', nullable: false }),
    DbString()
], Repository.prototype, "status", void 0);
__decorate([
    OneToMany()
], Repository.prototype, "terminalRepositories", void 0);
__decorate([
    OneToMany()
], Repository.prototype, "repositoryTransactionBlocks", void 0);
Repository = __decorate([
    Entity(),
    Table({ name: 'AGT_REPOSITORIES' })
], Repository);
export { Repository };
//# sourceMappingURL=Repository.js.map