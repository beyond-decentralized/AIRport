var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/tarmaq-entity";
let Database = class Database {
};
__decorate([
    Id(),
    DbNumber(),
    Column({ name: 'DATABASE_LID' })
], Database.prototype, "_localId", void 0);
__decorate([
    DbString(),
    Column({ name: 'DATABASE_DOMAIN' })
], Database.prototype, "domain", void 0);
__decorate([
    DbString(),
    Column({ name: 'DATABASE_GUID' })
], Database.prototype, "GUID", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'CONTINENT_ID',
        referencedColumnName: 'CONTINENT_ID', nullable: true
    })
], Database.prototype, "continent", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID', nullable: true
    })
], Database.prototype, "country", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'STATE_ID',
        referencedColumnName: 'STATE_ID', nullable: true
    })
], Database.prototype, "state", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'METRO_AREA_ID',
        referencedColumnName: 'METRO_AREA_ID', nullable: true
    })
], Database.prototype, "metroArea", void 0);
__decorate([
    OneToMany({ mappedBy: 'database' })
], Database.prototype, "databaseTypes", void 0);
Database = __decorate([
    Entity(),
    Table({
        name: 'DATABASES'
    })
], Database);
export { Database };
//# sourceMappingURL=Database.js.map