import { container, DI } from '@airport/di';
import { getSchemaName, getSequenceName, getTableName, QueryType, SQLDataType, STORE_DRIVER } from '@airport/ground-control';
import { SCHEMA_BUILDER } from '../../tokens';
import { SqlSchemaBuilder } from '../SqlSchemaBuilder';
export class PostgreSqlSchemaBuilder extends SqlSchemaBuilder {
    async createSchema(jsonSchema, storeDriver) {
        const schemaName = getSchemaName(jsonSchema);
        const createSchemaStatement = `CREATE SCHEMA ${schemaName}`;
        await storeDriver.query(QueryType.DDL, createSchemaStatement, [], false);
    }
    getColumnSuffix(jsonSchema, jsonEntity, jsonColumn) {
        let primaryKeySuffix = '';
        if (jsonColumn.notNull
            || this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
            primaryKeySuffix = ' NOT NULL';
        }
        const suffix = primaryKeySuffix;
        switch (jsonColumn.type) {
            case SQLDataType.ANY:
                return suffix;
            case SQLDataType.BOOLEAN:
                return `INTEGER ${suffix}`;
            case SQLDataType.DATE:
                return `REAL ${suffix}`;
            case SQLDataType.JSON:
                return `TEXT ${suffix}`;
            case SQLDataType.NUMBER:
                if (suffix) {
                    return `INTEGER ${suffix}`;
                }
                return 'REAL';
            case SQLDataType.STRING:
                return `TEXT ${suffix}`;
        }
    }
    getCreateTableSuffix(jsonSchema, jsonEntity) {
        return ``;
    }
    async buildAllSequences(jsonSchemas) {
        const storeDriver = await container(this).get(STORE_DRIVER);
        for (const jsonSchema of jsonSchemas) {
            for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
                await this.buildSequences(jsonSchema, jsonEntity, storeDriver);
            }
        }
        throw new Error('Finish implementing');
    }
    async buildSequences(jsonSchema, jsonEntity, storeDriver) {
        for (const jsonColumn of jsonEntity.columns) {
            if (!jsonColumn.isGenerated) {
                continue;
            }
            const prefixedTableName = getTableName(jsonSchema, jsonEntity);
            const sequenceName = getSequenceName(prefixedTableName, jsonColumn.name);
            let incrementBy = jsonColumn.allocationSize;
            if (!incrementBy) {
                incrementBy = 100000;
            }
            const createSequenceDdl = `CREATE SEQUENCE ${sequenceName} INCREMENT BY ${incrementBy}`;
            await storeDriver.query(QueryType.DDL, createSequenceDdl, [], false);
        }
    }
}
DI.set(SCHEMA_BUILDER, PostgreSqlSchemaBuilder);
//# sourceMappingURL=PostgreSqlSchemaBuilder.js.map