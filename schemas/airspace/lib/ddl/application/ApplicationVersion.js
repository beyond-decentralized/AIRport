var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, Id, JoinColumn, Json, ManyToOne, OneToMany, SequenceGenerator, Table, Transient } from '@airport/air-control';
let ApplicationVersion = class ApplicationVersion {
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
    DbNumber(),
    Id(),
    SequenceGenerator({ allocationSize: 100 })
], ApplicationVersion.prototype, "id", void 0);
__decorate([
    Column({ name: 'INTEGER_VERSION', nullable: false }),
    DbNumber()
], ApplicationVersion.prototype, "integerVersion", void 0);
__decorate([
    Column({ name: 'VERSION_STRING', nullable: false }),
    DbString()
], ApplicationVersion.prototype, "versionString", void 0);
__decorate([
    Column({ name: 'MAJOR_VERSION', nullable: false }),
    DbNumber()
], ApplicationVersion.prototype, "majorVersion", void 0);
__decorate([
    Column({ name: 'MINOR_VERSION', nullable: false }),
    DbNumber()
], ApplicationVersion.prototype, "minorVersion", void 0);
__decorate([
    Column({ name: 'PATCH_VERSION', nullable: false }),
    DbNumber()
], ApplicationVersion.prototype, "patchVersion", void 0);
__decorate([
    Column({ name: 'JSON_APPLICATION', nullable: false }),
    Json()
], ApplicationVersion.prototype, "jsonApplication", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_INDEX', nullable: false })
], ApplicationVersion.prototype, "application", void 0);
__decorate([
    OneToMany({ mappedBy: 'applicationVersion' })
], ApplicationVersion.prototype, "entities", void 0);
__decorate([
    OneToMany({ mappedBy: 'ownApplicationVersion' })
], ApplicationVersion.prototype, "references", void 0);
__decorate([
    OneToMany({ mappedBy: 'referencedApplicationVersion' })
], ApplicationVersion.prototype, "referencedBy", void 0);
__decorate([
    Transient()
], ApplicationVersion.prototype, "entityMapByName", void 0);
__decorate([
    Transient()
], ApplicationVersion.prototype, "referencesMapByName", void 0);
__decorate([
    Transient()
], ApplicationVersion.prototype, "referencedByMapByName", void 0);
ApplicationVersion = __decorate([
    Entity(),
    Table({ name: 'APPLICATION_VERSIONS' })
], ApplicationVersion);
export { ApplicationVersion };
//# sourceMappingURL=ApplicationVersion.js.map