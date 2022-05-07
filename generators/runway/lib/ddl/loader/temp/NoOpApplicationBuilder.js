import { IOC } from '@airport/direction-indicator';
import { DB_APPLICATION_UTILS, QueryType } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
export class NoOpApplicationBuilder extends SqlSchemaBuilder {
    async createApplication(jsonApplication, context) {
        const applicationName = IOC.getSync(DB_APPLICATION_UTILS).
            getFullApplicationName(jsonApplication);
        const createApplicationStatement = `CREATE APPLICATION ${applicationName}`;
        await this.storeDriver.query(QueryType.DDL, createApplicationStatement, [], context, false);
    }
    getColumnSuffix(jsonApplication, jsonEntity, jsonColumn) {
        return '';
    }
    getCreateTableSuffix(jsonApplication, jsonEntity) {
        return ``;
    }
    async buildAllSequences(jsonApplications, context) {
        let allSequences = [];
        for (const jsonApplication of jsonApplications) {
            const qApplication = this.airportDatabase.QM[IOC.getSync(DB_APPLICATION_UTILS).
                getFullApplicationName(jsonApplication)];
            for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
                allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
            }
        }
        return allSequences;
    }
    stageSequences(jsonApplications, context) {
        let stagedSequences = [];
        for (const jsonApplication of jsonApplications) {
            const qApplication = this.airportDatabase.QM[IOC.getSync(DB_APPLICATION_UTILS).
                getFullApplicationName(jsonApplication)];
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