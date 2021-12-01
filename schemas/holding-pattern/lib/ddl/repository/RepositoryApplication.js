var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from "@airport/air-control";
let RepositoryApplication = class RepositoryApplication {
};
__decorate([
    Id(),
    Column({ name: "REPOSITORY_SCHEMA_ID" }),
    GeneratedValue(),
    DbNumber()
], RepositoryApplication.prototype, "id", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: "REPOSITORY_ID", referencedColumnName: "ID" })
], RepositoryApplication.prototype, "repository", void 0);
__decorate([
    Column({ name: "SCHEMA_INDEX", nullable: false }),
    DbNumber()
], RepositoryApplication.prototype, "applicationIndex", void 0);
RepositoryApplication = __decorate([
    Entity(),
    Table({
        name: "REPOSITORY_SCHEMAS"
    })
], RepositoryApplication);
export { RepositoryApplication };
//# sourceMappingURL=RepositoryApplication.js.map