var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, Json, ManyToOne, OneToMany, Table } from '@airport/air-control';
let Schema = class Schema {
    constructor() {
        this.versions = [];
        this.currentVersion = [];
    }
};
__decorate([
    Id(),
    DbNumber(),
    Column({ name: 'SCHEMA_INDEX', nullable: false })
], Schema.prototype, "index", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'DOMAIN_ID', referencedColumnName: 'ID', nullable: false })
], Schema.prototype, "domain", void 0);
__decorate([
    Column({ name: 'SCOPE', nullable: false }),
    DbString()
], Schema.prototype, "scope", void 0);
__decorate([
    Column({ name: 'SCHEMA_NAME', nullable: false }),
    DbString()
], Schema.prototype, "name", void 0);
__decorate([
    Column({ name: 'PACKAGE_NAME', nullable: false }),
    DbString()
], Schema.prototype, "packageName", void 0);
__decorate([
    Column({ name: 'STATUS', nullable: false }),
    DbNumber()
], Schema.prototype, "status", void 0);
__decorate([
    OneToMany({ mappedBy: 'schema' })
], Schema.prototype, "versions", void 0);
__decorate([
    OneToMany({ mappedBy: 'schema' })
], Schema.prototype, "currentVersion", void 0);
__decorate([
    Column({ name: 'JSON_SCHEMA', nullable: false }),
    Json()
], Schema.prototype, "jsonSchema", void 0);
Schema = __decorate([
    Entity(),
    Table({
        name: 'SCHEMAS'
    })
], Schema);
export { Schema };
//# sourceMappingURL=Schema.js.map