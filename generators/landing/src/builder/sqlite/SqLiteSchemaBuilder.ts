import {
	AIR_DB,
	QSchemaInternal
}                         from '@airport/air-control'
import {
	ISequence,
	SEQUENCE_DAO
}                         from '@airport/airport-code'
import {DI}               from '@airport/di'
import {
	DbSchema,
	getSchemaName,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	SQLDataType
}                         from '@airport/ground-control'
import {SCHEMA_BUILDER}   from '../../diTokens'
import {SqlSchemaBuilder} from '../SqlSchemaBuilder'

export class SqLiteSchemaBuilder
	extends SqlSchemaBuilder {

	async createSchema(
		jsonSchema: JsonSchema
	): Promise<void> {
		// Nothing to do
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
				return suffix
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
		return ` WITHOUT ROWID`
	}

	async buildAllSequences(
		jsonSchemas: JsonSchema[]
	): Promise<ISequence[]> {
		let [airDb, sequenceDao] = await DI.get(AIR_DB, SEQUENCE_DAO)

		let allSequences: ISequence[] = []
		for (const jsonSchema of jsonSchemas) {
			const qSchema = airDb.QM[getSchemaName(jsonSchema)] as QSchemaInternal
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				allSequences = allSequences.concat(this.buildSequences(qSchema.__dbSchema__, jsonEntity))
			}
		}

		await sequenceDao.bulkCreate(allSequences)

		return allSequences
	}

	buildSequences(
		dbSchema: DbSchema,
		jsonEntity: JsonSchemaEntity,
	): ISequence[] {
		const sequences: ISequence[] = []
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
				incrementBy
			})
		}

		return sequences
	}

}

DI.set(SCHEMA_BUILDER, SqLiteSchemaBuilder)
