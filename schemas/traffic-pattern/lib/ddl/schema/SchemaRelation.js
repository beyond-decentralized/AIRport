"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let SchemaRelation = class SchemaRelation extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id()
], SchemaRelation.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'RELATION_INDEX', nullable: false })
], SchemaRelation.prototype, "index", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_PROPERTY_ID', referencedColumnName: 'ID', nullable: false })
], SchemaRelation.prototype, "property", void 0);
__decorate([
    air_control_1.Json(),
    air_control_1.Column({ name: 'FOREIGN_KEY' })
], SchemaRelation.prototype, "foreignKey", void 0);
__decorate([
    air_control_1.Json(),
    air_control_1.Column({ name: 'MANY_TO_ONE_ELEMENTS' })
], SchemaRelation.prototype, "manyToOneElems", void 0);
__decorate([
    air_control_1.Json(),
    air_control_1.Column({ name: 'ONE_TO_MANY_ELEMENTS' })
], SchemaRelation.prototype, "oneToManyElems", void 0);
__decorate([
    air_control_1.DbNumber(),
    air_control_1.Column({ name: 'RELATION_TYPE', nullable: false })
], SchemaRelation.prototype, "relationType", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_ID', nullable: false })
], SchemaRelation.prototype, "isId", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_TABLE_ID', referencedColumnName: 'ID', nullable: false })
], SchemaRelation.prototype, "entity", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'RELATION_SCHEMA_TABLE_ID', referencedColumnName: 'ID', nullable: false })
], SchemaRelation.prototype, "relationEntity", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'manyRelation' })
], SchemaRelation.prototype, "manyRelationColumns", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'oneRelation' })
], SchemaRelation.prototype, "oneRelationColumns", void 0);
SchemaRelation = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_RELATIONS'
    })
], SchemaRelation);
exports.SchemaRelation = SchemaRelation;
//# sourceMappingURL=SchemaRelation.js.map