var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { QueryType, SQLDataType } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
let PostgreApplicationBuilder = class PostgreApplicationBuilder extends SqlSchemaBuilder {
    async createApplication(jsonApplication, context) {
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        const createApplicationStatement = `CREATE SCHEMA ${fullApplication_Name}`;
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
                return `BIGINT ${suffix}`;
            case SQLDataType.JSON:
                return `TEXT ${suffix}`;
            case SQLDataType.NUMBER:
                return `NUMERIC(15,5) ${suffix}`;
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
            const qApplication = this.airportDatabase.QM[this.dbApplicationUtils.
                getFullApplication_Name(jsonApplication)];
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
            const qApplication = this.airportDatabase.QM[this.dbApplicationUtils.
                getFullApplication_Name(jsonApplication)];
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
    getIndexSql(indexName, tableName, columnNameList, unique) {
        let uniquePrefix;
        if (unique) {
            uniquePrefix = ' UNIQUE';
        }
        return `CREATE${uniquePrefix} INDEX ${indexName}
	  ON ${tableName} USING btree (
	  ${columnNameList.join(', ')}
	  )`;
    }
    getForeignKeySql(tableName, foreignKeyName, foreignKeyColumnNames, referencedTableName, referencedColumnNames) {
        return `ALTER TABLE ${tableName}
  ADD CONSTRAINT ${foreignKeyName}
  FOREIGN KEY (${foreignKeyColumnNames.join(', ')})
    REFERENCES ${referencedTableName} (${referencedColumnNames})
    ON DELETE Cascade
    ON UPDATE Cascade`;
    }
};
__decorate([
    Inject()
], PostgreApplicationBuilder.prototype, "airportDatabase", void 0);
PostgreApplicationBuilder = __decorate([
    Injected()
], PostgreApplicationBuilder);
export { PostgreApplicationBuilder };
//# sourceMappingURL=PostgreSchemaBuilder.js.map