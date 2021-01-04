import { AIR_DB } from '@airport/air-control';
import { SEQUENCE_DAO } from '@airport/airport-code';
import { container, DI, } from '@airport/di';
import { getSchemaName, QueryType, SQLDataType } from '@airport/ground-control';
import { SCHEMA_BUILDER, SqlSchemaBuilder } from '@airport/landing';
export class MySqlSchemaBuilder extends SqlSchemaBuilder {
    async createSchema(jsonSchema, storeDriver, context) {
        const schemaName = getSchemaName(jsonSchema);
        const createSchemaStatement = `CREATE SCHEMA ${schemaName}`;
        await storeDriver.query(QueryType.DDL, createSchemaStatement, [], context, false);
    }
    getColumnSuffix(jsonSchema, jsonEntity, jsonColumn) {
        let primaryKeySuffix = '';
        if (jsonColumn.notNull
            || this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
            primaryKeySuffix = ' NOT NULL';
        }
        // SEQUENCES no longer have a generated id (for simplicity of code)
        // let autoincrementSuffix = ''
        // if (jsonColumn.isGenerated
        // 	&& jsonSchema.name === '@airport/airport-code'
        // 	&& jsonEntity.name === 'SEQUENCES') {
        // 	autoincrementSuffix = ' AUTOINCREMENT'
        // }
        const suffix = primaryKeySuffix; // + autoincrementSuffix
        switch (jsonColumn.type) {
            case SQLDataType.ANY:
                // FIXME: revisit this, if keeping json need to add logic around retrieval
                // and storage of this value (like store as { value: X} and pull out the .value
                return `JSON ${suffix}`;
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
    async buildAllSequences(jsonSchemas, context) {
        console.log('buildAllSequences');
        let [airDb, sequenceDao] = await container(this).get(AIR_DB, SEQUENCE_DAO);
        let allSequences = [];
        for (const jsonSchema of jsonSchemas) {
            const qSchema = airDb.QM[getSchemaName(jsonSchema)];
            for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
                allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
            }
        }
        await sequenceDao.save(allSequences);
        return allSequences;
    }
    stageSequences(jsonSchemas, airDb, context) {
        console.log('stageSequences');
        let stagedSequences = [];
        for (const jsonSchema of jsonSchemas) {
            const qSchema = airDb.QM[getSchemaName(jsonSchema)];
            for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
                stagedSequences = stagedSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
            }
        }
        return stagedSequences;
    }
    buildSequences(dbSchema, jsonEntity) {
        const sequences = [];
        for (const jsonColumn of jsonEntity.columns) {
            if (!jsonColumn.isGenerated) {
                continue;
            }
            let incrementBy = jsonColumn.allocationSize;
            if (!incrementBy) {
                incrementBy = 10000;
            }
            sequences.push({
                schemaIndex: dbSchema.index,
                tableIndex: jsonEntity.index,
                columnIndex: jsonColumn.index,
                incrementBy,
                currentValue: 0
            });
        }
        return sequences;
    }
}
DI.set(SCHEMA_BUILDER, MySqlSchemaBuilder);
//# sourceMappingURL=MySqlSchemaBuilder.js.map