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
const ground_control_1 = require("@airport/ground-control");
const nano_sql_1 = require("nano-sql");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../InjectionTokens");
let SqlSchemaBuilder = class SqlSchemaBuilder {
    constructor() {
    }
    async build(jsonSchema) {
    }
    async buildTable(jsonTable) {
        const columnDefinitions = jsonTable.columns.map((jsonColumn) => ({
            key: jsonColumn.name,
            props: this.getProperties(jsonTable, jsonColumn),
            type: this.getColumnType(jsonColumn)
        }));
        nano_sql_1.nSQL(jsonTable.name).model(columnDefinitions);
    }
    getProperties(jsonTable, jsonColumn) {
        const properties = [];
        if (jsonColumn.isGenerated) {
            properties.push('ai');
        }
        for (const index of jsonTable.tableConfig.indexes) {
            for (const column of index.columnList) {
                if (column === jsonColumn.name) {
                }
            }
        }
        for (const propertyRef of jsonColumn.propertyRefs) {
        }
    }
    getColumnType(column) {
        switch (column.type) {
            case ground_control_1.SQLDataType.ANY:
                return 'any';
            case ground_control_1.SQLDataType.BOOLEAN:
                return 'bool';
            case ground_control_1.SQLDataType.DATE:
                return 'number';
            case ground_control_1.SQLDataType.JSON:
                return 'string';
            case ground_control_1.SQLDataType.NUMBER:
                return 'number';
            case ground_control_1.SQLDataType.STRING:
                return 'string';
        }
    }
};
SqlSchemaBuilder = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaBuilderToken),
    __metadata("design:paramtypes", [])
], SqlSchemaBuilder);
exports.SqlSchemaBuilder = SqlSchemaBuilder;
//# sourceMappingURL=SqlSchemaBuilder.js.map