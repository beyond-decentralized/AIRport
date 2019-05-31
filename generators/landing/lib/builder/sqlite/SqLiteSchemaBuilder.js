"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        let autoincrementSuffix = '';
        if (jsonColumn.isGenerated
            && jsonSchema.name === '@airport/airport-code'
            && jsonEntity.name === 'SEQUENCES') {
            autoincrementSuffix = ' AUTOINCREMENT';
        }
        const suffix = primaryKeySuffix + autoincrementSuffix;
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
    async buildSequences(jsonSchema, jsonEntity) {
        for (const jsonColumn of jsonEntity.columns) {
            if (!jsonColumn.isGenerated) {
                continue;
            }
            const prefixedTableName = ground_control_1.getTableName(jsonSchema, jsonEntity);
            const sequenceName = ground_control_1.getSequenceName(prefixedTableName, jsonColumn.name);
            let incrementBy = jsonColumn.allocationSize;
            if (!incrementBy) {
                incrementBy = 100000;
            }
            // const createSequenceDdl
            // 	      = `CREATE SEQUENCE ${sequenceName} INCREMENT BY ${incrementBy}`
            //
            // await this.storeDriver.query(QueryType.DDL, createSequenceDdl, [], false)
            throw `Not Implemented`;
        }
    }
}
exports.SqLiteSchemaBuilder = SqLiteSchemaBuilder;
di_1.DI.set(diTokens_1.SCHEMA_BUILDER, SqLiteSchemaBuilder);
//# sourceMappingURL=SqLiteSchemaBuilder.js.map