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
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
/**
 * Many-to-Many between Columns and properties
 */
let SchemaPropertyColumn = class SchemaPropertyColumn extends VersionedSchemaObject_1.VersionedSchemaObject {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", Object)
], SchemaPropertyColumn.prototype, "column", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_PROPERTY_ID', referencedColumnName: 'ID', nullable: false }),
    __metadata("design:type", Object)
], SchemaPropertyColumn.prototype, "property", void 0);
SchemaPropertyColumn = __decorate([
    air_control_1.Entity()
    // TODO: rename table name to SCHEMA_PROPERTY_COLUMNS
    ,
    air_control_1.Table({
        name: 'SCHEMA_COLUMN_PROPERTIES'
    })
], SchemaPropertyColumn);
exports.SchemaPropertyColumn = SchemaPropertyColumn;
//# sourceMappingURL=SchemaPropertyColumn.js.map