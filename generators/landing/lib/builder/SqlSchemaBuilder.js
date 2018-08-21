"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
class SqlSchemaBuilder {
    constructor(storeDriver) {
        this.storeDriver = storeDriver;
    }
    async build(jsonSchema) {
        await this.createSchema(jsonSchema);
        for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
            await this.buildTable(jsonSchema, jsonEntity);
        }
    }
    getSchemaName(jsonSchema) {
        const domainPrefix = jsonSchema.domain.replace(/\./g, '_');
        const schemaPrefix = jsonSchema.name
            .replace(/@/g, '_')
            .replace(/\//g, '_');
        return `${domainPrefix}__${schemaPrefix}`;
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