"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
let SchemaVersion = class SchemaVersion {
};
__decorate([
    air_control_1.Id(),
    air_control_1.SequenceGenerator({ allocationSize: 100 }),
    air_control_1.DbNumber()
], SchemaVersion.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'INTEGER_VERSION', nullable: false })
], SchemaVersion.prototype, "integerVersion", void 0);
__decorate([
    air_control_1.Column({ name: 'VERSION_STRING', nullable: false })
], SchemaVersion.prototype, "versionString", void 0);
__decorate([
    air_control_1.Column({ name: 'MAJOR_VERSION', nullable: false }),
    air_control_1.DbNumber()
], SchemaVersion.prototype, "majorVersion", void 0);
__decorate([
    air_control_1.Column({ name: 'MINOR_VERSION', nullable: false }),
    air_control_1.DbNumber()
], SchemaVersion.prototype, "minorVersion", void 0);
__decorate([
    air_control_1.Column({ name: 'PATCH_VERSION', nullable: false }),
    air_control_1.DbNumber()
], SchemaVersion.prototype, "patchVersion", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_INDEX', nullable: false })
], SchemaVersion.prototype, "schema", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'schemaVersion' })
], SchemaVersion.prototype, "entities", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'ownSchemaVersion' })
], SchemaVersion.prototype, "references", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'referencedSchemaVersion' })
], SchemaVersion.prototype, "referencedBy", void 0);
__decorate([
    air_control_1.Transient()
], SchemaVersion.prototype, "entityMapByName", void 0);
__decorate([
    air_control_1.Transient()
], SchemaVersion.prototype, "referencesMapByName", void 0);
__decorate([
    air_control_1.Transient()
], SchemaVersion.prototype, "referencedByMapByName", void 0);
SchemaVersion = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'SCHEMA_VERSIONS' })
], SchemaVersion);
exports.SchemaVersion = SchemaVersion;
//# sourceMappingURL=SchemaVersion.js.map