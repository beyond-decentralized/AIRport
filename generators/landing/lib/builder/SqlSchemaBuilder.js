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
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SqlSchemaBuilder = class SqlSchemaBuilder {
    constructor() {
    }
    async build(jsonSchema) {
    }
    async buildTable(jsonEntity) {
        const columnsDdl = jsonEntity.columns.map((jsonColumn) => {
            let columnDdl = `${jsonColumn.name} ${this.getColumnType(jsonEntity, jsonColumn)}`;
            return columnDdl;
        });
        const createDdl = `CREATE TABLE ${jsonEntity.name} (
		${columnsDdl.join(',\n')}
		) WITHOUT ROWID`;
    }
    getProperties(jsonEntity, jsonColumn) {
        const properties = [];
        if (jsonColumn.isGenerated) {
            properties.push('ai');
        }
        for (const index of jsonEntity.tableConfig.indexes) {
            for (const column of index.columnList) {
                if (column === jsonColumn.name) {
                }
            }
        }
        for (const propertyRef of jsonColumn.propertyRefs) {
        }
    }
    getPrimaryKeySuffix(jsonEntity, jsonColumn) {
        const isId = jsonColumn.propertyRefs.some((propertyRef) => {
            const jsonProperty = jsonEntity.properties[propertyRef.index];
            if (jsonProperty.isId) {
                return true;
            }
        });
        if (isId) {
            return this.getPrimaryKeyColumnSyntax();
        }
        return '';
    }
};
SqlSchemaBuilder = __decorate([
    typedi_1.Service(InjectionTokens_1.SchemaBuilderToken),
    __metadata("design:paramtypes", [])
], SqlSchemaBuilder);
exports.SqlSchemaBuilder = SqlSchemaBuilder;
//# sourceMappingURL=SqlSchemaBuilder.js.map