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
let SchemaProperty = class SchemaProperty extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id(),
    __metadata("design:type", Number)
], SchemaProperty.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'PROPERTY_INDEX', nullable: false }),
    __metadata("design:type", Number)
], SchemaProperty.prototype, "index", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", SchemaEntity_1.SchemaEntity)
], SchemaProperty.prototype, "entity", void 0);
__decorate([
    air_control_1.Column({ name: 'NAME', nullable: false }),
    __metadata("design:type", String)
], SchemaProperty.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_ID', nullable: false }),
    __metadata("design:type", Boolean)
], SchemaProperty.prototype, "isId", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'property' }),
    __metadata("design:type", Array)
], SchemaProperty.prototype, "propertyColumns", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'property' }),
    __metadata("design:type", Array)
], SchemaProperty.prototype, "relation", void 0);
SchemaProperty = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_PROPERTIES'
    })
], SchemaProperty);
exports.SchemaProperty = SchemaProperty;
//# sourceMappingURL=SchemaProperty.js.map