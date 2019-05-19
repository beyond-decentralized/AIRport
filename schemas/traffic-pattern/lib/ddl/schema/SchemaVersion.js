"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const Schema_1 = require("./Schema");
let SchemaVersion = class SchemaVersion {
};
__decorate([
    air_control_1.Id(),
    air_control_1.SequenceGenerator({ allocationSize: 100 }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SchemaVersion.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'INTEGER_VERSION', nullable: false }),
    __metadata("design:type", Number)
], SchemaVersion.prototype, "integerVersion", void 0);
__decorate([
    air_control_1.Column({ name: 'VERSION_STRING', nullable: false }),
    __metadata("design:type", String)
], SchemaVersion.prototype, "versionString", void 0);
__decorate([
    air_control_1.Column({ name: 'MAJOR_VERSION', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SchemaVersion.prototype, "majorVersion", void 0);
__decorate([
    air_control_1.Column({ name: 'MINOR_VERSION', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SchemaVersion.prototype, "minorVersion", void 0);
__decorate([
    air_control_1.Column({ name: 'PATCH_VERSION', nullable: false }),
    air_control_1.DbNumber(),
    __metadata("design:type", Number)
], SchemaVersion.prototype, "patchVersion", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_INDEX', nullable: false }),
    __metadata("design:type", Schema_1.Schema)
], SchemaVersion.prototype, "schema", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'schemaVersion' }),
    __metadata("design:type", Array)
], SchemaVersion.prototype, "entities", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'ownSchemaVersion' }),
    __metadata("design:type", Array)
], SchemaVersion.prototype, "references", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'referencedSchemaVersion' }),
    __metadata("design:type", Array)
], SchemaVersion.prototype, "referencedBy", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], SchemaVersion.prototype, "entityMapByName", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], SchemaVersion.prototype, "referencesMapByName", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], SchemaVersion.prototype, "referencedByMapByName", void 0);
SchemaVersion = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({ name: 'SCHEMA_VERSIONS' })
], SchemaVersion);
exports.SchemaVersion = SchemaVersion;
//# sourceMappingURL=SchemaVersion.js.map