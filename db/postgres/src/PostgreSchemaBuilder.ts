import {
	AIRPORT_DATABASE,
	IAirportDatabase,
	QApplicationInternal
} from '@airport/air-control'
import {
	ISequence,
	SEQUENCE_DAO
} from '@airport/airport-code'
import {
	container,
	DEPENDENCY_INJECTION, IContext,
} from '@airport/direction-indicator';
import {
	DbApplication,
	getFullApplicationName,
	IStoreDriver,
	JsonApplication,
	JsonApplicationColumn,
	JsonApplicationEntity,
	QueryType,
	SQLDataType
} from '@airport/ground-control'
import { APPLICATION_BUILDER, SqlApplicationBuilder } from '@airport/landing'

export class PostgreApplicationBuilder
	extends SqlApplicationBuilder {

	async createApplication(
		jsonApplication: JsonApplication,
		storeDriver: IStoreDriver,
		context: IContext,
	): Promise<void> {
		const fullApplicationName = getFullApplicationName(jsonApplication)
		const createApplicationStatement = `CREATE SCHEMA ${fullApplicationName}`

		await storeDriver.query(QueryType.DDL, createApplicationStatement, [],
			context, false)
	}

	getColumnSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonApplicationEntity,
		jsonColumn: JsonApplicationColumn
	): string {
		let primaryKeySuffix = ''
		if (jsonColumn.notNull
			|| this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
			primaryKeySuffix = ' NOT NULL'
		}

		const suffix = primaryKeySuffix // + autoincrementSuffix

		switch (jsonColumn.type) {
			case SQLDataType.ANY:
				// FIXME: revisit this, if keeping json need to add logic around retrieval
				// and storage of this value (like store as { value: X} and pull out the .value
				return `JSON ${suffix}`
			case SQLDataType.BOOLEAN:
				return `INTEGER ${suffix}`
			case SQLDataType.DATE:
				return `BIGINT ${suffix}`
			case SQLDataType.JSON:
				return `TEXT ${suffix}`
			case SQLDataType.NUMBER:
				return `NUMERIC(15,5) ${suffix}`
			case SQLDataType.STRING:
				return `TEXT ${suffix}`
			default:
				throw new Error(`Unexpected data type for column ${jsonApplication.name}${jsonEntity.name}.${jsonColumn.name}`)
		}
	}

	getCreateTableSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonApplicationEntity
	): string {
		return ``
	}

	async buildAllSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): Promise<ISequence[]> {
		console.log('buildAllSequences')

		let [airDb, sequenceDao] = await container(this).get(AIRPORT_DATABASE, SEQUENCE_DAO)

		let allSequences: ISequence[] = []
		for (const jsonApplication of jsonApplications) {
			const qApplication = airDb.QM[getFullApplicationName(jsonApplication)] as QApplicationInternal
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity))
			}
		}

		await sequenceDao.save(allSequences)

		return allSequences
	}

	stageSequences(
		jsonApplications: JsonApplication[],
		airDb: IAirportDatabase,
		context: IContext,
	): ISequence[] {
		console.log('stageSequences')

		let stagedSequences: ISequence[] = []
		for (const jsonApplication of jsonApplications) {
			const qApplication = airDb.QM[getFullApplicationName(jsonApplication)] as QApplicationInternal
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				stagedSequences = stagedSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity))
			}
		}

		return stagedSequences
	}

	buildSequences(
		dbApplication: DbApplication,
		jsonEntity: JsonApplicationEntity,
	): ISequence[] {
		const sequences: ISequence[] = []
		for (const jsonColumn of jsonEntity.columns) {
			if (!jsonColumn.isGenerated) {
				continue
			}
			let incrementBy = jsonColumn.allocationSize
			if (!incrementBy) {
				incrementBy = 1000
			}

			sequences.push({
				applicationIndex: dbApplication.index,
				tableIndex: jsonEntity.index,
				columnIndex: jsonColumn.index,
				incrementBy,
				currentValue: 0
			})
		}

		return sequences
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
		}
		return `CREATE${uniquePrefix} INDEX ${indexName}
	  ON ${tableName} USING btree (
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
		return `ALTER TABLE ${tableName}
  ADD CONSTRAINT ${foreignKeyName}
  FOREIGN KEY (${foreignKeyColumnNames.join(', ')})
    REFERENCES ${referencedTableName} (${referencedColumnNames})
    ON DELETE Cascade
    ON UPDATE Cascade`;
	}

}

DEPENDENCY_INJECTION.set(APPLICATION_BUILDER, PostgreApplicationBuilder)
