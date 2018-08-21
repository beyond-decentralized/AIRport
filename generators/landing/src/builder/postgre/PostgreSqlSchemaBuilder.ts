import {
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	QueryType,
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
export class PostgreSqlSchemaBuilder
	extends SqlSchemaBuilder {

	constructor(
		@Inject(StoreDriverToken)
			storeDriver: IStoreDriver
	) {
		super(storeDriver)
	}

	async createSchema(
		jsonSchema: JsonSchema
	): Promise<void> {
		const schemaName            = this.getSchemaName(jsonSchema)
		const createSchemaStatement = `CREATE SCHEMA ${schemaName}`

		await this.storeDriver.query(QueryType.DDL, createSchemaStatement, [], false)
	}

	getColumnSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string {
		let primaryKeySuffix = '';
		if(this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
			primaryKeySuffix = ' NOT NULL'
		}

		const suffix = primaryKeySuffix

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
		return `${this.getSchemaName(jsonSchema)}.${jsonEntity.name}`
	}

	getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return ``
	}

}
