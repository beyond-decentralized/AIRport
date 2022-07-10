var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/tarmaq-entity";
let RepositoryDatabase = class RepositoryDatabase {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'REPOSITORY_LID',
        referencedColumnName: 'REPOSITORY_LID'
    })
], RepositoryDatabase.prototype, "repository", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'DATABASE_LID',
        referencedColumnName: 'DATABASE_LID'
    })
], RepositoryDatabase.prototype, "database", void 0);
RepositoryDatabase = __decorate([
    Entity(),
    Table({
        name: "REPOSITORY_DATABASES"
    })
], RepositoryDatabase);
export { RepositoryDatabase };
//# sourceMappingURL=RepositoryDatabase.js.map