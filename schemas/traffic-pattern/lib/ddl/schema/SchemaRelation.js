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
let SchemaRelation = class SchemaRelation {
};
__decorate([
    air_control_1.Id(),
    __metadata("design:type", Number)
], SchemaRelation.prototype, "index", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "SCHEMA_VERSION_ID" },
        { name: "TABLE_INDEX" },
        { name: "PROPERTY_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], SchemaRelation.prototype, "property", void 0);
__decorate([
    air_control_1.Json(),
    air_control_1.Column({ name: "FOREIGN_KEY" }),
    __metadata("design:type", Object)
], SchemaRelation.prototype, "foreignKey", void 0);
__decorate([
    air_control_1.Json(),
    air_control_1.Column({ name: "MANY_TO_ONE_ELEMENTS" }),
    __metadata("design:type", Object)
], SchemaRelation.prototype, "manyToOneElems", void 0);
__decorate([
    air_control_1.Json(),
    air_control_1.Column({ name: "ONE_TO_MANY_ELEMENTS" }),
    __metadata("design:type", Object)
], SchemaRelation.prototype, "oneToManyElems", void 0);
__decorate([
    air_control_1.DbNumber(),
    air_control_1.Column({ name: "RELATION_TYPE" }),
    __metadata("design:type", Number)
], SchemaRelation.prototype, "relationType", void 0);
__decorate([
    air_control_1.Column({ name: "IS_REPOSITORY_JOIN" }),
    __metadata("design:type", Boolean)
], SchemaRelation.prototype, "isRepositoryJoin", void 0);
__decorate([
    air_control_1.Column({ name: "IS_ID" }),
    __metadata("design:type", Boolean)
], SchemaRelation.prototype, "isId", void 0);
__decorate([
    air_control_1.Column({ name: "ADD_TO_JOIN_FUNCTION" }),
    __metadata("design:type", String)
], SchemaRelation.prototype, "addToJoinFunction", void 0);
__decorate([
    air_control_1.Column({ name: "JOIN_FUNCTION_WITH_OPERATOR" }),
    __metadata("design:type", Number)
], SchemaRelation.prototype, "joinFunctionWithOperator", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "RELATION_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID" },
        { name: "RELATION_TABLE_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], SchemaRelation.prototype, "relationEntity", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: air_control_1.CascadeType.ALL, mappedBy: "manyRelation" }),
    __metadata("design:type", Array)
], SchemaRelation.prototype, "manyRelationColumns", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: air_control_1.CascadeType.ALL, mappedBy: "oneRelation" }),
    __metadata("design:type", Array)
], SchemaRelation.prototype, "oneRelationColumns", void 0);
SchemaRelation = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: "SCHEMA_RELATIONS"
    })
], SchemaRelation);
exports.SchemaRelation = SchemaRelation;
//# sourceMappingURL=SchemaRelation.js.map