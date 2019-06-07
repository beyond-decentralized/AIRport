"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const airport_code_1 = require("@airport/airport-code");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../diTokens");
const SqlSchemaBuilder_1 = require("../SqlSchemaBuilder");
class SqLiteSchemaBuilder extends SqlSchemaBuilder_1.SqlSchemaBuilder {
    async createSchema(jsonSchema) {
        // Nothing to do
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
            case ground_control_1.SQLDataType.ANY:
                return suffix;
            case ground_control_1.SQLDataType.BOOLEAN:
                return `INTEGER ${suffix}`;
            case ground_control_1.SQLDataType.DATE:
                return `REAL ${suffix}`;
            case ground_control_1.SQLDataType.JSON:
                return `TEXT ${suffix}`;
            case ground_control_1.SQLDataType.NUMBER:
                if (suffix) {
                    return `INTEGER ${suffix}`;
                }
                return 'REAL';
            case ground_control_1.SQLDataType.STRING:
                return `TEXT ${suffix}`;
        }
    }
    getCreateTableSuffix(jsonSchema, jsonEntity) {
        return ` WITHOUT ROWID`;
    }
    async buildAllSequences(jsonSchemas) {
        let airDb = await di_1.DI.getP(air_control_1.AIR_DB);
        let allSequences = [];
        for (const jsonSchema of jsonSchemas) {
            const qSchema = airDb.QM[ground_control_1.getSchemaName(jsonSchema)];
            for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
                allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
            }
        }
        const sequenceDao = await di_1.DI.getP(airport_code_1.SEQUENCE_DAO);
        await sequenceDao.bulkCreate(allSequences);
        return allSequences;
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
                incrementBy
            });
        }
        return sequences;
    }
}
exports.SqLiteSchemaBuilder = SqLiteSchemaBuilder;
di_1.DI.set(diTokens_1.SCHEMA_BUILDER, SqLiteSchemaBuilder);
//# sourceMappingURL=SqLiteSchemaBuilder.js.map