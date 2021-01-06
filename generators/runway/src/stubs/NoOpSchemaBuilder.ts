import {
	AIR_DB,
	IAirportDatabase,
	QSchemaInternal
} from '@airport/air-control';
import {
	container,
	IContext
} from '@airport/di';
import {
	DbSchema,
	getSchemaName,
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	QueryType,
	SQLDataType
} from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';

export class NoOpSchemaBuilder
	extends SqlSchemaBuilder {

	async createSchema(
		jsonSchema: JsonSchema,
		storeDriver: IStoreDriver,
		context: IContext,
	): Promise<void> {
		const schemaName            = getSchemaName(jsonSchema)
		const createSchemaStatement = `CREATE SCHEMA ${schemaName}`

		await storeDriver.query(QueryType.DDL, createSchemaStatement, [],
			context, false)
	}

	getColumnSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string {
		let primaryKeySuffix = ''
		if (jsonColumn.notNull
			|| this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
			primaryKeySuffix = ' NOT NULL'
		}

		// SEQUENCES no longer have a generated id (for simplicity of code)
		// let autoincrementSuffix = ''
		// if (jsonColumn.isGenerated
		// 	&& jsonSchema.name === '@airport/airport-code'
		// 	&& jsonEntity.name === 'SEQUENCES') {
		// 	autoincrementSuffix = ' AUTOINCREMENT'
		// }

		const suffix = primaryKeySuffix // + autoincrementSuffix

		switch (jsonColumn.type) {
			case SQLDataType.ANY:
				// FIXME: revisit this, if keeping json need to add logic around retrieval
				// and storage of this value (like store as { value: X} and pull out the .value
				return `JSON ${suffix}`
			case SQLDataType.BOOLEAN:
				return `INTEGER ${suffix}`
			case SQLDataType.DATE:
				return `REAL ${suffix}`
			case SQLDataType.JSON:
				return `TEXT ${suffix}`
			case SQLDataType.NUMBER:
				if (suffix) {
					return `INTEGER ${suffix}`
				}
				return 'REAL'
			case SQLDataType.STRING:
				return `TEXT ${suffix}`
		}
	}

	getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return ``
	}

	async buildAllSequences(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<any[]> {
		console.log('buildAllSequences')

		let airDb = await container(this).get(AIR_DB)

		let allSequences: any[] = []
		for (const jsonSchema of jsonSchemas) {
			const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity))
			}
		}

		return allSequences
	}

	stageSequences(
		jsonSchemas: JsonSchema[],
		airDb: IAirportDatabase,
		context: IContext,
	): any[] {
		console.log('stageSequences')

		let stagedSequences: any[] = []
		for (const jsonSchema of jsonSchemas) {
			const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				stagedSequences = stagedSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity))
			}
		}

		return stagedSequences
	}

	buildSequences(
		dbSchema: DbSchema,
		jsonEntity: JsonSchemaEntity,
	): any[] {
		const sequences: any[] = []
		for (const jsonColumn of jsonEntity.columns) {
			if (!jsonColumn.isGenerated) {
				continue
			}
			let incrementBy = jsonColumn.allocationSize
			if (!incrementBy) {
				incrementBy = 10000
			}

			sequences.push({
				schemaIndex: dbSchema.index,
				tableIndex: jsonEntity.index,
				columnIndex: jsonColumn.index,
				incrementBy,
				currentValue: 0
			})
		}

		return sequences
	}

}
