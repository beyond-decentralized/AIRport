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
const ColumnDecorators_1 = require("@airport/air-control/lib/impl/core/entity/metadata/ColumnDecorators");
const ground_control_1 = require("@airport/ground-control");
const SchemaVersion_1 = require("./SchemaVersion");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let SchemaEntity = class SchemaEntity extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    __metadata("design:type", Number)
], SchemaEntity.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'INDEX', nullable: false }),
    ColumnDecorators_1.DbNumber(),
    __metadata("design:type", Number)
], SchemaEntity.prototype, "index", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_LOCAL', nullable: false }),
    __metadata("design:type", Boolean)
], SchemaEntity.prototype, "isLocal", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_REPOSITORY_ENTITY', nullable: false }),
    __metadata("design:type", Boolean)
], SchemaEntity.prototype, "isRepositoryEntity", void 0);
__decorate([
    air_control_1.Column({ name: 'NAME', nullable: false }),
    __metadata("design:type", String)
], SchemaEntity.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'TABLE_CONFIGURATION', nullable: false }),
    air_control_1.Json(),
    __metadata("design:type", Object)
], SchemaEntity.prototype, "tableConfig", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SchemaVersion_1.SchemaVersion
    //
    // One-to-Many's
    //
    )
], SchemaEntity.prototype, "schemaVersion", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'entity' }),
    __metadata("design:type", Array)
], SchemaEntity.prototype, "columns", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'entity' }),
    __metadata("design:type", Array)
], SchemaEntity.prototype, "properties", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'entity' }),
    __metadata("design:type", Array)
], SchemaEntity.prototype, "relations", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'relationEntity' }),
    __metadata("design:type", Array)
], SchemaEntity.prototype, "relationReferences", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], SchemaEntity.prototype, "columnMap", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Array)
], SchemaEntity.prototype, "idColumns", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], SchemaEntity.prototype, "idColumnMap", void 0);
__decorate([
    air_control_1.Transient(),
    __metadata("design:type", Object)
], SchemaEntity.prototype, "propertyMap", void 0);
SchemaEntity = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_ENTITIES'
    })
], SchemaEntity);
exports.SchemaEntity = SchemaEntity;
//# sourceMappingURL=SchemaEntity.js.map