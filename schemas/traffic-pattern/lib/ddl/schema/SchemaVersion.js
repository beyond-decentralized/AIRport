var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, OneToMany, SequenceGenerator, Table, Transient } from '@airport/air-control';
let SchemaVersion = class SchemaVersion {
    constructor() {
        this.entities = [];
        this.references = [];
        this.referencedBy = [];
        this.entityMapByName = {};
        this.referencesMapByName = {};
        this.referencedByMapByName = {};
    }
};
__decorate([
    Id(),
    SequenceGenerator({ allocationSize: 100 }),
    DbNumber()
], SchemaVersion.prototype, "id", void 0);
__decorate([
    Column({ name: 'INTEGER_VERSION', nullable: false })
], SchemaVersion.prototype, "integerVersion", void 0);
__decorate([
    Column({ name: 'VERSION_STRING', nullable: false })
], SchemaVersion.prototype, "versionString", void 0);
__decorate([
    Column({ name: 'MAJOR_VERSION', nullable: false }),
    DbNumber()
], SchemaVersion.prototype, "majorVersion", void 0);
__decorate([
    Column({ name: 'MINOR_VERSION', nullable: false }),
    DbNumber()
], SchemaVersion.prototype, "minorVersion", void 0);
__decorate([
    Column({ name: 'PATCH_VERSION', nullable: false }),
    DbNumber()
], SchemaVersion.prototype, "patchVersion", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'SCHEMA_INDEX', nullable: false })
], SchemaVersion.prototype, "schema", void 0);
__decorate([
    OneToMany({ mappedBy: 'schemaVersion' })
], SchemaVersion.prototype, "entities", void 0);
__decorate([
    OneToMany({ mappedBy: 'ownSchemaVersion' })
], SchemaVersion.prototype, "references", void 0);
__decorate([
    OneToMany({ mappedBy: 'referencedSchemaVersion' })
], SchemaVersion.prototype, "referencedBy", void 0);
__decorate([
    Transient()
], SchemaVersion.prototype, "entityMapByName", void 0);
__decorate([
    Transient()
], SchemaVersion.prototype, "referencesMapByName", void 0);
__decorate([
    Transient()
], SchemaVersion.prototype, "referencedByMapByName", void 0);
SchemaVersion = __decorate([
    Entity(),
    Table({ name: 'SCHEMA_VERSIONS' })
], SchemaVersion);
export { SchemaVersion };
//# sourceMappingURL=SchemaVersion.js.map