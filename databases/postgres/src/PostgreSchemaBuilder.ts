import {
	IAirportDatabase,
	QAppInternal
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ISequence
} from '@airport/airport-code'
import { IContext } from '@airport/direction-indicator'
import {
	DbApplication,
	JsonApplication,
	JsonColumn,
	JsonEntity,
	QueryType,
	SQLDataType
} from '@airport/ground-control'
import { SqlSchemaBuilder } from '@airport/takeoff'

@Injected()
export class PostgreApplicationBuilder
	extends SqlSchemaBuilder {

	@Inject()
	airportDatabase: IAirportDatabase

	async createApplication(
		jsonApplication: JsonApplication,
		context: IContext,
	): Promise<void> {
		const fullDbApplication_Name = this.dbApplicationUtils.
			getDbApplication_FullName(jsonApplication)
		const createApplicationStatement = `CREATE SCHEMA ${fullDbApplication_Name}`

		await this.storeDriver.query(QueryType.DDL, createApplicationStatement, [],
			context, false)
	}

	getColumnSuffix(
		jsonApplication: JsonApplication,
		jsonEntity: JsonEntity,
		jsonColumn: JsonColumn
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
		jsonEntity: JsonEntity
	): string {
		return ``
	}

	async buildAllSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): Promise<ISequence[]> {
		console.log('buildAllSequences')

		let allSequences: ISequence[] = []
		for (const jsonApplication of jsonApplications) {
			const qApplication = this.airportDatabase.QM[this.dbApplicationUtils.
				getDbApplication_FullName(jsonApplication)] as QAppInternal
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				allSequences = allSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity))
			}
		}

		await this.sequenceDao.save(allSequences)

		return allSequences
	}

	stageSequences(
		jsonApplications: JsonApplication[],
		context: IContext,
	): ISequence[] {
		console.log('stageSequences')

		let stagedSequences: ISequence[] = []
		for (const jsonApplication of jsonApplications) {
			const qApplication = this.airportDatabase.QM[this.dbApplicationUtils.
				getDbApplication_FullName(jsonApplication)] as QAppInternal
			for (const jsonEntity of jsonApplication.versions[jsonApplication.versions.length - 1].entities) {
				stagedSequences = stagedSequences.concat(this.buildSequences(qApplication.__dbApplication__, jsonEntity))
			}
		}

		return stagedSequences
	}

	buildSequences(
		dbApplication: DbApplication,
		jsonEntity: JsonEntity,
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
				entityIndex: jsonEntity.index,
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

