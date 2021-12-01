import { AIRPORT_DATABASE } from '@airport/air-control';
import { container } from '@airport/di';
import { getApplicationName, QueryType } from '@airport/ground-control';
import { SqlApplicationBuilder } from '@airport/landing';
export class NoOpApplicationBuilder extends SqlApplicationBuilder {
    async createApplication(jsonApplication, storeDriver, context) {
        const applicationName = getApplicationName(jsonApplication);
        const createApplicationStatement = `CREATE APPLICATION ${applicationName}`;
        await storeDriver.query(QueryType.DDL, createApplicationStatement, [], context, false);
    }
    getColumnSuffix(jsonApplication, jsonEntity, jsonColumn) {
        return '';
    }
    getCreateTableSuffix(jsonApplication, jsonEntity) {
        return ``;
    }
    async buildAllSequences(jsonApplications, context) {
        let airDb = await container(this).get(AIRPORT_DATABASE);
        let allSequences = [];
        for (const jsonApplication of jsonApplications) {
            const qApplication = airDb.QM[getApplicationName(jsonApplication)];
            for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
                allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
            }
        }
        return allSequences;
    }
    stageSequences(jsonApplications, airDb, context) {
        let stagedSequences = [];
        for (const jsonApplication of jsonApplications) {
            const qApplication = airDb.QM[getApplicationName(jsonApplication)];
            for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
                stagedSequences = stagedSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
            }
        }
        return stagedSequences;
    }
    buildSequences(dbApplication, jsonEntity) {
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
                applicationIndex: dbApplication.index,
                tableIndex: jsonEntity.index,
                columnIndex: jsonColumn.index,
                incrementBy,
                currentValue: 0
            });
        }
        return sequences;
    }
    getIndexSql(indexName, tableName, columnNameList, unique) {
        return '';
    }
    getForeignKeySql(tableName, foreignKeyName, foreignKeyColumnNames, referencedTableName, referencedColumnNames) {
        return null;
    }
}
//# sourceMappingURL=NoOpApplicationBuilder.js.map