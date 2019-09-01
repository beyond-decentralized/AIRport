"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let SchemaColumn = class SchemaColumn extends VersionedSchemaObject_1.VersionedSchemaObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.manyRelationColumns = [];
        this.oneRelationColumns = [];
    }
};
__decorate([
    air_control_1.Id()
], SchemaColumn.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'COLUMN_INDEX', nullable: false })
], SchemaColumn.prototype, "index", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
], SchemaColumn.prototype, "entity", void 0);
__decorate([
    air_control_1.Column({ name: 'ID_INDEX' })
], SchemaColumn.prototype, "idIndex", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_GENERATED', nullable: false })
], SchemaColumn.prototype, "isGenerated", void 0);
__decorate([
    air_control_1.Column({ name: 'ALLOCATION_SIZE' })
], SchemaColumn.prototype, "allocationSize", void 0);
__decorate([
    air_control_1.Column({ name: 'NAME', nullable: false })
], SchemaColumn.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'NOT_NULL', nullable: false })
], SchemaColumn.prototype, "notNull", void 0);
__decorate([
    air_control_1.DbNumber(),
    air_control_1.Column({ name: 'TYPE', nullable: false })
], SchemaColumn.prototype, "type", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'column' })
], SchemaColumn.prototype, "propertyColumns", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'manyColumn' })
], SchemaColumn.prototype, "manyRelationColumns", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'oneColumn' })
], SchemaColumn.prototype, "oneRelationColumns", void 0);
SchemaColumn = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_COLUMNS'
    })
], SchemaColumn);
exports.SchemaColumn = SchemaColumn;
//# sourceMappingURL=SchemaColumn.js.map