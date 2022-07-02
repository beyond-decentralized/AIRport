var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbDate, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
let Repository = class Repository {
    constructor() {
        this.repositoryTransactionHistory = [];
    }
};
__decorate([
    Column({ name: "ID" }),
    GeneratedValue(),
    Id(),
    DbNumber()
], Repository.prototype, "id", void 0);
__decorate([
    Column({ name: 'AGE_SUITABILITY', nullable: false }),
    DbNumber()
], Repository.prototype, "ageSuitability", void 0);
__decorate([
    Column({ name: "CREATED_AT", nullable: false }),
    DbDate()
], Repository.prototype, "createdAt", void 0);
__decorate([
    Column({ name: "IMMUTABLE", nullable: false })
], Repository.prototype, "immutable", void 0);
__decorate([
    Column({ name: "SOURCE", nullable: false }),
    DbString()
], Repository.prototype, "source", void 0);
__decorate([
    Column({ name: "GUID", nullable: false }),
    DbString()
], Repository.prototype, "GUID", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: "OWNER_USER_ID", referencedColumnName: "ID",
        nullable: false
    })
], Repository.prototype, "owner", void 0);
__decorate([
    OneToMany({ mappedBy: 'repository' })
], Repository.prototype, "repositoryTransactionHistory", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID', nullable: true })
], Repository.prototype, "continent", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID', nullable: true })
], Repository.prototype, "country", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'STATE_ID', referencedColumnName: 'ID', nullable: true })
], Repository.prototype, "state", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'METRO_AREA_ID', referencedColumnName: 'ID', nullable: true })
], Repository.prototype, "metroArea", void 0);
__decorate([
    OneToMany({ mappedBy: 'repository' })
], Repository.prototype, "repositoryTypes", void 0);
Repository = __decorate([
    Entity(),
    Table({
        name: "REPOSITORY"
    })
], Repository);
export { Repository };
//# sourceMappingURL=Repository.js.map