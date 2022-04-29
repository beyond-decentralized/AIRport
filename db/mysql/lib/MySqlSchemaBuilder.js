import { getFullApplicationName, QueryType, SQLDataType } from '@airport/ground-control';
import { SqlApplicationBuilder } from '@airport/landing';
export class MySqlApplicationBuilder extends SqlApplicationBuilder {
    async createApplication(jsonApplication, context) {
        const fullApplicationName = getFullApplicationName(jsonApplication);
        const createApplicationStatement = `CREATE SCHEMA ${fullApplicationName}`;
        await this.storeDriver.query(QueryType.DDL, createApplicationStatement, [], context, false);
    }
    getColumnSuffix(jsonApplication, jsonEntity, jsonColumn) {
        let primaryKeySuffix = '';
        if (jsonColumn.notNull
            || this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
            primaryKeySuffix = ' NOT NULL';
        }
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
            default:
                throw new Error(`Unexpected data type for column ${jsonApplication.name}${jsonEntity.name}.${jsonColumn.name}`);
        }
    }
    getCreateTableSuffix(jsonApplication, jsonEntity) {
        return ``;
    }
    async buildAllSequences(jsonApplications, context) {
        console.log('buildAllSequences');
        let allSequences = [];
        for (const jsonApplication of jsonApplications) {
            const qApplication = this.airportDatabase.QM[getFullApplicationName(jsonApplication)];
            for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
                allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
            }
        }
        await this.sequenceDao.save(allSequences);
        return allSequences;
    }
    stageSequences(jsonApplications, context) {
        console.log('stageSequences');
        let stagedSequences = [];
        for (const jsonApplication of jsonApplications) {
            const qApplication = this.airportDatabase.QM[getFullApplicationName(jsonApplication)];
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
                incrementBy = 1000;
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
}
//# sourceMappingURL=MySqlSchemaBuilder.js.map