import {
	IDbSchemaUtils,
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	QueryType,
	DbSchemaUtilsToken,
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
		@Inject(DbSchemaUtilsToken)
			dbSchemaUtils: IDbSchemaUtils,
		@Inject(StoreDriverToken)
			storeDriver: IStoreDriver
	) {
		super(dbSchemaUtils, storeDriver)
	}

	async createSchema(
		jsonSchema: JsonSchema
	): Promise<void> {
		const schemaName            = this.dbSchemaUtils.getSchemaName(jsonSchema)
		const createSchemaStatement = `CREATE SCHEMA ${schemaName}`

		await this.storeDriver.query(QueryType.DDL, createSchemaStatement, [], false)
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
		return `${this.dbSchemaUtils.getSchemaName(jsonSchema)}.${jsonEntity.name}`
	}

	getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return ``
	}

	async buildSequences(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): Promise<void> {
		for (const jsonColumn of jsonEntity.columns) {
			if (!jsonColumn.isGenerated) {
				continue
			}
			const prefixedTableName = this.getTableName(jsonSchema, jsonEntity)
			const sequenceName      = this.dbSchemaUtils.getSequenceName(prefixedTableName, jsonColumn.name)
			let incrementBy         = jsonColumn.allocationSize
			if (!incrementBy) {
				incrementBy = 100000
			}

			const createSequenceDdl
				      = `CREATE SEQUENCE ${sequenceName} INCREMENT BY ${incrementBy}`

			await this.storeDriver.query(QueryType.DDL, createSequenceDdl, [], false)
		}
	}

}
