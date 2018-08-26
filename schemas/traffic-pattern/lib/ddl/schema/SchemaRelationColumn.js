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
let SchemaRelationColumn = class SchemaRelationColumn {
};
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "MANY_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID" },
        { name: "MANY_TABLE_INDEX", referencedColumnName: "TABLE_INDEX" },
        { name: "MANY_COLUMN_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], SchemaRelationColumn.prototype, "manyColumn", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "ONE_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID" },
        { name: "ONE_TABLE_INDEX", referencedColumnName: "TABLE_INDEX" },
        { name: "ONE_COLUMN_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], SchemaRelationColumn.prototype, "oneColumn", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "MANY_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID" },
        { name: "MANY_TABLE_INDEX", referencedColumnName: "TABLE_INDEX" },
        { name: "MANY_RELATION_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], SchemaRelationColumn.prototype, "manyRelation", void 0);
__decorate([
    air_control_1.Id(),
    air_control_1.ManyToOne(),
    air_control_1.JoinColumns([
        { name: "ONE_SCHEMA_VERSION_ID", referencedColumnName: "SCHEMA_VERSION_ID" },
        { name: "ONE_TABLE_INDEX", referencedColumnName: "TABLE_INDEX" },
        { name: "ONE_RELATION_INDEX", referencedColumnName: "INDEX" }
    ]),
    __metadata("design:type", Object)
], SchemaRelationColumn.prototype, "oneRelation", void 0);
SchemaRelationColumn = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: "SCHEMA_RELATION_COLUMNS"
    })
], SchemaRelationColumn);
exports.SchemaRelationColumn = SchemaRelationColumn;
//# sourceMappingURL=schemarelationcolumn.js.map