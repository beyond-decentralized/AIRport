import {
  IAirportDatabase,
  QAppInternal,
} from '@airport/air-traffic-control';
import {
  Inject,
  Injected
} from '@airport/direction-indicator'
import {
  IContext,
} from '@airport/direction-indicator';
import {
  DbApplication,
  DbSequence,
  JsonApplication,
  JsonApplicationColumn,
  JsonApplicationEntity,
  SQLDataType,
} from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/takeoff';

@Injected()
export class SqLiteApplicationBuilder
  extends SqlSchemaBuilder {

  @Inject()
  airportDatabase: IAirportDatabase

  async createApplication(
    jsonApplication: JsonApplication,
    context: IContext,
  ): Promise<void> {
    // Nothing to do
  }

  getColumnSuffix(
    jsonApplication: JsonApplication,
    jsonEntity: JsonApplicationEntity,
    jsonColumn: JsonApplicationColumn,
  ): string {
    let primaryKeySuffix = '';
    if (jsonColumn.notNull
      || this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
      primaryKeySuffix = ' NOT NULL';
    }

    const suffix = primaryKeySuffix; // + autoincrementSuffix

    switch (jsonColumn.type) {
      case SQLDataType.ANY:
        return suffix
      case SQLDataType.BOOLEAN:
        return `INTEGER ${suffix}`
      case SQLDataType.DATE:
        return `REAL ${suffix}`
      case SQLDataType.JSON:
        return `TEXT ${suffix}`;
      case SQLDataType.NUMBER:
        if (suffix) {
          return `INTEGER ${suffix}`
        }
        return 'REAL';
      case SQLDataType.STRING:
        return `TEXT ${suffix}`
      default:
        throw new Error(`Unexpected data type for ${jsonApplication.name}.${jsonEntity.name}.${jsonColumn.name}`)
    }
  }

  getCreateTableSuffix(
    jsonApplication: JsonApplication,
    jsonEntity: JsonApplicationEntity,
  ): string {
    return ` WITHOUT ROWID`;
  }

  async buildAllSequences(
    jsonApplications: JsonApplication[],
    context: IContext
  ): Promise<DbSequence[]> {
    console.log('buildAllSequences');

    let allSequences: DbSequence[] = [];
    for (const jsonApplication of jsonApplications) {
      const qApplication = this.airportDatabase.QM[this.dbApplicationUtils.
        getApplication_FullName(jsonApplication)] as QAppInternal;
      for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
        allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
      }
    }

    await this.sequenceDao.save(allSequences, context);

    return allSequences;
  }

  stageSequences(
    jsonApplications: JsonApplication[],
    context: IContext,
  ): DbSequence[] {
    console.log('stageSequences');

    let stagedSequences: DbSequence[] = [];
    for (const jsonApplication of jsonApplications) {
      const qApplication = this.airportDatabase.QM[this.dbApplicationUtils.
        getApplication_FullName(jsonApplication)] as QAppInternal;
      for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
        stagedSequences = stagedSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity));
      }
    }

    return stagedSequences;
  }

  buildSequences(
    dbApplication: DbApplication,
    jsonEntity: JsonApplicationEntity,
  ): DbSequence[] {
    const sequences: DbSequence[] = [];
    for (const jsonColumn of jsonEntity.columns) {
      if (!jsonColumn.isGenerated) {
        continue;
      }
      let incrementBy = jsonColumn.allocationSize;
      if (!incrementBy) {
        incrementBy = 100;
      }

      sequences.push({
        applicationIndex: dbApplication.index,
        tableIndex: jsonEntity.index,
        columnIndex: jsonColumn.index,
        incrementBy,
        currentValue: 0,
      });
    }

    return sequences;
  }

  protected getIndexSql(
    indexName: string,
    tableName: string,
    columnNameList: string[],
    unique: boolean
  ): string {
    let uniquePrefix
    if (unique) {
      uniquePrefix = ' UNIQUE'
    } else {
      uniquePrefix = ''
    }
    return `CREATE${uniquePrefix} INDEX ${indexName}
    ON ${tableName} (
    ${columnNameList.join(', ')}
    )`
  }

  protected getForeignKeySql(
    tableName: string,
    foreignKeyName: string,
    foreignKeyColumnNames: string[],
    referencedTableName: string,
    referencedColumnNames: string[]
  ): string {
    // TODO: investigate adding foreign key support for SqLite.
    // Right now there is no alter table command and it has to be baked
    // into the CREATE TABLE command, though techniques for getting
    // around this do exist:
    // https://stackoverflow.com/questions/1884818/how-do-i-add-a-foreign-key-to-an-existing-sqlite-table
    return null;
  }

}

