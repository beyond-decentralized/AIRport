import {
  AIRPORT_DATABASE,
  IAirportDatabase,
  QSchemaInternal,
} from '@airport/air-control';
import {
  ISequence,
  SEQUENCE_DAO,
} from '@airport/airport-code';
import {
  container,
  DI,
  IContext,
} from '@airport/di';
import {
  DbSchema,
  getSchemaName,
  IStoreDriver,
  JsonSchema,
  JsonSchemaColumn,
  JsonSchemaEntity,
  SQLDataType,
} from '@airport/ground-control';
import { SCHEMA_BUILDER, SqlSchemaBuilder } from '@airport/landing';

export class SqLiteSchemaBuilder
  extends SqlSchemaBuilder {

  async createSchema(
    jsonSchema: JsonSchema,
    storeDriver: IStoreDriver,
    context: IContext,
  ): Promise<void> {
    // Nothing to do
  }

  getColumnSuffix(
    jsonSchema: JsonSchema,
    jsonEntity: JsonSchemaEntity,
    jsonColumn: JsonSchemaColumn,
  ): string {
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
        throw new Error(`Unexpected data type for ${jsonSchema.name}.${jsonEntity.name}.${jsonColumn.name}`)
    }
  }

  getCreateTableSuffix(
    jsonSchema: JsonSchema,
    jsonEntity: JsonSchemaEntity,
  ): string {
    return ` WITHOUT ROWID`;
  }

  async buildAllSequences(
    jsonSchemas: JsonSchema[],
  ): Promise<ISequence[]> {
    console.log('buildAllSequences');

    let [airDb, sequenceDao] = await container(this).get(AIRPORT_DATABASE, SEQUENCE_DAO);

    let allSequences: ISequence[] = [];
    for (const jsonSchema of jsonSchemas) {
      const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal;
      for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
        allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
      }
    }

    await sequenceDao.save(allSequences);

    return allSequences;
  }

  stageSequences(
    jsonSchemas: JsonSchema[],
    airDb: IAirportDatabase,
  ): ISequence[] {
    console.log('stageSequences');

    let stagedSequences: ISequence[] = [];
    for (const jsonSchema of jsonSchemas) {
      const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal;
      for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
        stagedSequences = stagedSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity));
      }
    }

    return stagedSequences;
  }

  buildSequences(
    dbSchema: DbSchema,
    jsonEntity: JsonSchemaEntity,
  ): ISequence[] {
    const sequences: ISequence[] = [];
    for (const jsonColumn of jsonEntity.columns) {
      if (!jsonColumn.isGenerated) {
        continue;
      }
      let incrementBy = jsonColumn.allocationSize;
      if (!incrementBy) {
        incrementBy = 100;
      }

      sequences.push({
        schemaIndex: dbSchema.index,
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
    // into the CREATE TALBE command, though techniques for getting
    // around this do exist:
    // https://stackoverflow.com/questions/1884818/how-do-i-add-a-foreign-key-to-an-existing-sqlite-table
		return null;
	}

}

DI.set(SCHEMA_BUILDER, SqLiteSchemaBuilder);
