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
const ground_control_1 = require("@airport/ground-control");
const SchemaEntity_1 = require("./SchemaEntity");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let SchemaColumn = class SchemaColumn extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id(),
    air_control_1.GeneratedValue(),
    __metadata("design:type", Number)
], SchemaColumn.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'INDEX', nullable: false }),
    __metadata("design:type", Number)
], SchemaColumn.prototype, "index", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SchemaEntity_1.SchemaEntity)
], SchemaColumn.prototype, "entity", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'column' }),
    __metadata("design:type", Array)
], SchemaColumn.prototype, "propertyColumns", void 0);
__decorate([
    air_control_1.Column({ name: 'ID_INDEX' }),
    __metadata("design:type", Number)
], SchemaColumn.prototype, "idIndex", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_GENERATED', nullable: false }),
    __metadata("design:type", Boolean)
], SchemaColumn.prototype, "isGenerated", void 0);
__decorate([
    air_control_1.Column({ name: 'ALLOCATION_SIZE' }),
    __metadata("design:type", Number)
], SchemaColumn.prototype, "allocationSize", void 0);
__decorate([
    air_control_1.Column({ name: 'NAME', nullable: false }),
    __metadata("design:type", String)
], SchemaColumn.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'NOT_NULL', nullable: false }),
    __metadata("design:type", Boolean)
], SchemaColumn.prototype, "notNull", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'manyColumn' }),
    __metadata("design:type", Array)
], SchemaColumn.prototype, "manyRelationColumns", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'oneColumn' }),
    __metadata("design:type", Array)
], SchemaColumn.prototype, "oneRelationColumns", void 0);
__decorate([
    air_control_1.DbNumber(),
    air_control_1.Column({ name: 'TYPE', nullable: false }),
    __metadata("design:type", Number)
], SchemaColumn.prototype, "type", void 0);
SchemaColumn = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_COLUMNS'
    })
], SchemaColumn);
exports.SchemaColumn = SchemaColumn;
//# sourceMappingURL=SchemaColumn.js.map