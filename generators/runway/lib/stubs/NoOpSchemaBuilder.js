import { AIR_DB } from '@airport/air-control';
import { container } from '@airport/di';
import { getSchemaName, QueryType } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
export class NoOpSchemaBuilder extends SqlSchemaBuilder {
    async createSchema(jsonSchema, storeDriver, context) {
        const schemaName = getSchemaName(jsonSchema);
        const createSchemaStatement = `CREATE SCHEMA ${schemaName}`;
        await storeDriver.query(QueryType.DDL, createSchemaStatement, [], context, false);
    }
    getColumnSuffix(jsonSchema, jsonEntity, jsonColumn) {
        return '';
    }
    getCreateTableSuffix(jsonSchema, jsonEntity) {
        return ``;
    }
    async buildAllSequences(jsonSchemas, context) {
        let airDb = await container(this).get(AIR_DB);
        let allSequences = [];
        for (const jsonSchema of jsonSchemas) {
            const qSchema = airDb.QM[getSchemaName(jsonSchema)];
            for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
                allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
            }
        }
        return allSequences;
    }
    stageSequences(jsonSchemas, airDb, context) {
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
//# sourceMappingURL=NoOpSchemaBuilder.js.map