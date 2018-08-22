import {
	ISchemaUtils,
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	SchemaUtilsToken,
	SQLDataType,
	StoreDriverToken
}                           from '@airport/ground-control'
import {
	Inject,
	Service
}                           from 'typedi'
import {SchemaBuilderToken} from '../../InjectionTokens'
import {SqlSchemaBuilder}   from '../SqlSchemaBuilder'

@Service(SchemaBuilderToken)
export class SqLiteSchemaBuilder
	extends SqlSchemaBuilder {

	constructor(
		@Inject(SchemaUtilsToken)
			schemaUtils: ISchemaUtils,
		@Inject(StoreDriverToken)
			storeDriver: IStoreDriver
	) {
		super(schemaUtils, storeDriver)
	}

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
		if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
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
		return `${this.schemaUtils.getSchemaName(jsonSchema)}__${jsonEntity.name}`
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