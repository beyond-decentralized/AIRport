import { container } from '@airport/di';
import { getTableName, QueryType, STORE_DRIVER, } from '@airport/ground-control';
export class SqlSchemaBuilder {
    async build(jsonSchema) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        await this.createSchema(jsonSchema, storeDriver);
        for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
            await this.buildTable(jsonSchema, jsonEntity, storeDriver);
        }
    }
    async buildTable(jsonSchema, jsonEntity, storeDriver) {
        const primaryKeyColumnNames = [];
        const tableColumnsDdl = jsonEntity.columns.map((jsonColumn) => {
            let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonSchema, jsonEntity, jsonColumn)}`;
            if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
                primaryKeyColumnNames.push(jsonColumn.name);
            }
            return columnDdl;
        });
        const createTableSuffix = this.getCreateTableSuffix(jsonSchema, jsonEntity);
        const tableName = getTableName(jsonSchema, jsonEntity);
        let primaryKeySubStatement = ``;
        if (primaryKeyColumnNames.length) {
            primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames);
        }
        const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`;
        await storeDriver.query(QueryType.DDL, createTableDdl, [], false);
        for (const indexConfig of jsonEntity.tableConfig.indexes) {
            let uniquePrefix = '';
            if (indexConfig.unique) {
                uniquePrefix = ' UNIQUE';
            }
            const createIndexDdl = `CREATE${uniquePrefix} INDEX ${indexConfig.name}
			ON ${tableName} (
			${indexConfig.columnList.join(', ')}
			)`;
            await storeDriver.query(QueryType.DDL, createIndexDdl, [], false);
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
//# sourceMappingURL=SqlSchemaBuilder.js.map