"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class SqlSchemaBuilder {
    constructor() {
        di_1.DI.get((dbSchemaUtils, storeDriver) => {
            this.dbSchemaUtils = dbSchemaUtils;
            this.storeDriver = storeDriver;
        }, ground_control_1.DB_SCHEMA_UTILS, ground_control_1.STORE_DRIVER);
    }
    async build(jsonSchema) {
        await this.createSchema(jsonSchema);
        for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
            await this.buildTable(jsonSchema, jsonEntity);
        }
    }
    async buildTable(jsonSchema, jsonEntity) {
        const primaryKeyColumnNames = [];
        const tableColumnsDdl = jsonEntity.columns.map((jsonColumn) => {
            let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonSchema, jsonEntity, jsonColumn)}`;
            if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
                primaryKeyColumnNames.push(jsonColumn.name);
            }
            return columnDdl;
        });
        const createTableSuffix = this.getCreateTableSuffix(jsonSchema, jsonEntity);
        const tableName = this.getTableName(jsonSchema, jsonEntity);
        let primaryKeySubStatement = ``;
        if (primaryKeyColumnNames.length) {
            primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames);
        }
        const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`;
        await this.storeDriver.query(ground_control_1.QueryType.DDL, createTableDdl, [], false);
        await this.buildSequences(jsonSchema, jsonEntity);
        for (const indexConfig of jsonEntity.tableConfig.indexes) {
            let uniquePrefix = '';
            if (indexConfig.unique) {
                uniquePrefix = ' UNIQUE';
            }
            const createIndexDdl = `CREATE${uniquePrefix} INDEX ${indexConfig.name}
			ON ${tableName} (
			${indexConfig.columnList.join(', ')}
			)`;
            await this.storeDriver.query(ground_control_1.QueryType.DDL, createIndexDdl, [], false);
        }
        //
    }
    isPrimaryKeyColumn(jsonEntity, jsonColumn) {
        return jsonColumn.propertyRefs.some((propertyRef) => {
            const jsonProperty = jsonEntity.properties[propertyRef.index];
            if (jsonProperty.isId) {
                return true;
            }
        });
    }
    /*
    protected abstract isForeignKey(
        jsonEntity: JsonSchemaEntity,
        jsonColumn: JsonSchemaColumn
    ): boolean
    */
    getPrimaryKeyStatement(columnNames) {
        return `,
			PRIMARY KEY (
			${columnNames.join(',\n')}
			)`;
    }
}
exports.SqlSchemaBuilder = SqlSchemaBuilder;
//# sourceMappingURL=SqlSchemaBuilder.js.map