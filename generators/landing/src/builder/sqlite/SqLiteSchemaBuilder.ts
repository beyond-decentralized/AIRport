import {DI}               from '@airport/di'
import {
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

		let autoincrementSuffix = ''
		if (jsonColumn.isGenerated
			&& jsonSchema.name === '@airport/airport-code'
			&& jsonEntity.name === 'SEQUENCES') {
			autoincrementSuffix = ' AUTOINCREMENT'
		}

		const suffix = primaryKeySuffix + autoincrementSuffix

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

	getTableName(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return `${this.dbSchemaUtils.getSchemaName(jsonSchema)}__${jsonEntity.name}`
	}

	getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return ` WITHOUT ROWID`
	}

	async buildSequences(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): Promise<void> {
	}

}

DI.set(SCHEMA_BUILDER, SqLiteSchemaBuilder)
