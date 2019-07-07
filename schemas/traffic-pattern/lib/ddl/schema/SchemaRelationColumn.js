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
const SchemaColumn_1 = require("./SchemaColumn");
const SchemaRelation_1 = require("./SchemaRelation");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let SchemaRelationColumn = class SchemaRelationColumn extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id(),
    __metadata("design:type", Number)
], SchemaRelationColumn.prototype, "id", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({
        name: 'MANY_SCHEMA_COLUMN_ID',
        referencedColumnName: 'ID',
        nullable: false
    }),
    __metadata("design:type", SchemaColumn_1.SchemaColumn)
], SchemaRelationColumn.prototype, "manyColumn", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'ONE_SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SchemaColumn_1.SchemaColumn)
], SchemaRelationColumn.prototype, "oneColumn", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'MANY_SCHEMA_RELATION_ID', referencedColumnName: 'ID' }),
    __metadata("design:type", SchemaRelation_1.SchemaRelation)
], SchemaRelationColumn.prototype, "manyRelation", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'ONE_SCHEMA_RELATION_ID', referencedColumnName: 'ID' }),
    __metadata("design:type", SchemaRelation_1.SchemaRelation)
], SchemaRelationColumn.prototype, "oneRelation", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'PARENT_RELATION_ID', referencedColumnName: 'ID' }),
    __metadata("design:type", SchemaRelation_1.SchemaRelation)
], SchemaRelationColumn.prototype, "parentRelation", void 0);
SchemaRelationColumn = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_RELATION_COLUMNS'
    })
], SchemaRelationColumn);
exports.SchemaRelationColumn = SchemaRelationColumn;
//# sourceMappingURL=SchemaRelationColumn.js.map