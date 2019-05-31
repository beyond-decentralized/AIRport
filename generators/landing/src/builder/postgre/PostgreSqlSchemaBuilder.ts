import {DI}               from '@airport/di'
import {
	getSchemaName,
	getSequenceName,
	getTableName,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	QueryType,
	SQLDataType
}                         from '@airport/ground-control'
import {SCHEMA_BUILDER}   from '../../diTokens'
import {SqlSchemaBuilder} from '../SqlSchemaBuilder'

export class PostgreSqlSchemaBuilder
	extends SqlSchemaBuilder {

	async createSchema(
		jsonSchema: JsonSchema
	): Promise<void> {
		const schemaName            = getSchemaName(jsonSchema)
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
			const prefixedTableName = getTableName(jsonSchema, jsonEntity)
			const sequenceName      = getSequenceName(prefixedTableName, jsonColumn.name)
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

DI.set(SCHEMA_BUILDER, PostgreSqlSchemaBuilder)
